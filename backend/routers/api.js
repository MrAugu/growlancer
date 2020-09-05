const User = require("../models/user");

class ApiRoutes {
  constructor (website) {
    website.app.get("/api/fetch/:code", async (request, response) => {
      const GrowStocksUser = await website.growstocks.exchangeAuthToken(request.params.code);

      response.setHeader("Content-Type", "application/json");
      if (GrowStocksUser.error) return response.status(200).send(JSON.stringify({
        error: true,
        reason: "Invalid GrowStocks code."
      }));

      response.status(200).send(JSON.stringify({
        id: GrowStocksUser.id,
        username: GrowStocksUser.name,
        growid: GrowStocksUser.growid
      }));
    });

    website.app.get("/api/fetch/user/:id", website.authenticate, async (request, response) => {
      const dbUser = await User.findOne({
        id: parseInt(request.params.id, 10)
      });

      response.setHeader("Content-Type", "application/json");

      if (!dbUser) {
        return response.status(200).send(JSON.stringify({
          exists: false,
          code: 404,
          user: {}
        }));
      } else {
        return response.status(200).send(JSON.stringify({
          exists: true,
          code: 200,
          user: dbUser
        }));
      }
    });
  }
}

module.exports = ApiRoutes;