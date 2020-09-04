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

class Website {
  constructor (options = {}) {
    this.port = options.port || 3030;
    this.app = express();
    this.log = console;
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
    this.log("Loading mongodb session store.");
    this.app.use(session({
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      }),
      secret: config.dashboard.sessionSecret,
      resave: true,
      saveUninitialized: true
    }));

    this.log("Loading helmet.");
    this.app.use(helmet());

    this.log("Loading body-parser.");
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    
    this.log("Middlewares loaded.");
  }
  
  async loadRoutes () {
    this.log("- Loading routes.");

    this.log("Registering authentication routes.");
    this.register(AuthenticationRoutes);
  }

  register (Router) {
    return new Router(this);
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