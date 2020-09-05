const User = require("../models/user");

class AuthenticationRoutes {
  constructor (website) {
    website.app.get("/login", (request, response) => {
      response.redirect(website.growstocks.authURL);
    });

    website.app.get("/callback", async (request, response, next) => {
      const code = request.query.code;
      if (!code) response.redirect("/");

      const user = await website.growstocks.exchangeAuthToken(code);
      if (user.error) return response.redirect("/");

      const dbUser = await User.findOne({
        id: user.id
      });

      if (!dbUser) {
        const newUser = new User({
          id: user.id,
          username: user.name,
          growid: user.growid ? user.growid : null,
          joined: Date.now(),
          token: user.token
        });
        await newUser.save().catch(() => {});
      } else {
        dbUser.username = user.name;
        dbUser.growid = user.growid ? user.growid : null;
        await dbUser.save().catch(() => {});
      }

      const obj = JSON.parse(JSON.stringify(user));
      obj.token = code;

      request.login(obj, () => {
        next();
      });
    }, async (request, response) => {
      response.redirect(`/?auth=ok&token=${encodeURIComponent(request.user.token)}`);
    });
  }
}

module.exports = AuthenticationRoutes; 