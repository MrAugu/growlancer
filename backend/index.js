const path = require("path");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const helmet = require("helmet");
const mongoose = require("mongoose");
const config = require("./config");
const bodyParser = require("body-parser");
const { GrowStocksClient } = require("growstocks-wrapper");
const AuthenticationRoutes = require("./routers/authentication");
const StaticRoutes = require("./routers/static");
const passport = require("passport");
const ApiRoutes = require("./routers/api");
const CdnRoutes = require("./routers/cdn");

mongoose.connect(config.db.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

class Website {
  constructor (options = {}) {
    this.port = options.port || 3030;
    this.app = express();
    this.log = console.log;
    this.growstocks = new GrowStocksClient({
      organisation: config.growstocks.organisation,
      url: config.growstocks.url,
      clientCode: config.growstocks.clientCode,
      secret: config.growstocks.secret,
      redirectURL: config.growstocks.redirectURL,
      payRedirectURL: config.growstocks.payRedirectURL,
      scopes: config.growstocks.scopes
    });

    const initialPath = process.cwd();
    const pathArray = initialPath.split(path.sep);
    pathArray.splice(pathArray.length - 1, 1);
    this.root = pathArray.join(path.sep);
  }

  async loadMiddleware () {
    this.log("- Loading up middlewares...");
    this.app.set("view engine", "html");


    this.log("Loading body-parser.");
    this.app.use(bodyParser.json({
      limit: "30mb"
    }));
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    

    this.log("Loading mongodb session store.");
    this.app.use(session({
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      }),
      secret: config.website.sessionSecret,
      resave: true,
      saveUninitialized: true
    }));

    this.log("Loding passport.");
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    passport.serializeUser((user, done) => {
      done(null, user);
    });
       
    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    this.log("Loading helmet.");
    this.app.use(helmet());

    this.log("Middlewares loaded.");
  }
  
  async loadRoutes () {
    this.log("- Loading routes.");

    this.log("Loading the css & js static assets.");
    this.app.use("/css", express.static(path.resolve(`${this.root}${path.sep}dist${path.sep}css`)));
    this.app.use("/js", express.static(path.resolve(`${this.root}${path.sep}dist${path.sep}js`)));

    this.log("Registering authentication routes.");
    this.register(AuthenticationRoutes);

    this.log("Registering static routes.");
    this.register(StaticRoutes);

    this.log("Registering api routes.");
    this.register(ApiRoutes);

    this.log("Registering cdn routes.");
    this.register(CdnRoutes);
  }

  register (Router) {
    return new Router(this);
  }

  render (response) {
    response.setHeader("Content-Security-Policy", "script-src-elem https://unpkg.com 'unsafe-inline' 'unsafe-eval' 'self' *; script-src 'unsafe-inline' 'unsafe-eval' https://unpkg.com 'self' *; ");
    return response.sendFile(`${this.root}${path.sep}dist${path.sep}index.html`);
  }

  authenticate (request, response, next) {
    if (request.isAuthenticated()) {
      return next();
    } else {
      return response.redirect("/login");
    }
  }

  startUp () {
    this.log("- Starting up...");
    return new Promise((resolve, reject) => {
      try {
        this.app.listen(this.port, () => {
          this.log(`Started listening for requests on port ${this.port}.`);
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

module.exports = Website;