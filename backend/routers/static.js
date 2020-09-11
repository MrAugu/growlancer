const Service = require("../models/service");

class StaticRoutes {
  constructor (website) {
    website.app.get("/", (request, response) => { // eslint-disable-line no-unused-vars
      website.render(response);
    });

    website.app.get("/account", website.authenticate, (request, response) => { // eslint-disable-line no-unused-vars
      website.render(response);
    });

    website.app.get("/services", website.authenticate, (request, response) => {
      website.render(response);
    });

    website.app.get("/services/new", website.authenticate, (request, response) => { // eslint-disable-line no-unused-vars
      website.render(response);
    });

    website.app.get("/services/edit/:id", website.authenticate, async (request, response) => { // eslint-disable-line no-unused-vars
      const service = await Service.findOne({
        id: request.params.id
      });

      if (!service) return response.redirect("/services/new");
      if (service.owner !== request.user.id) return response.redirect("/services/new");

      website.render(response);
    });
  }
}

module.exports = StaticRoutes;