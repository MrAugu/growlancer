class StaticRoutes {
  constructor (website) {
    website.app.get("/", (request, response) => { // eslint-disable-line no-unused-vars
      website.render(response);
    });

    website.app.get("/account", website.authenticate, (request, response) => { // eslint-disable-line no-unused-vars
      website.render(response);
    });

    website.app.get("/services/new", website.authenticate, (request, response) => { // eslint-disable-line no-unused-vars
      website.render(response);
    });
  }
}

module.exports = StaticRoutes;