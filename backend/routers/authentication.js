class AuthenticationRoutes {
  constructor (website) {
    website.app.get("/login", (request, response) => {
      response.redirect(website.growstocks.authURL);
    });
  }
}

module.exports = AuthenticationRoutes; 