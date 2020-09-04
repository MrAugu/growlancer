class StaticRoutes {
  constructor (website) {
    website.app.get("/", (request, response) => { // eslint-disable-line no-unused-vars
      website.render(response);
    });
  }
}

module.exports = StaticRoutes;