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