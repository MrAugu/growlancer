class ApiRoutes {
  constructor (website) {
    website.app.get("/api/fetch/:code", async (request, response) => {
      const GrowStocksUser = await website.growstocks.exchangeAuthToken(request.params.code);

      response.setHeader("Content-Type", "application/json");
      if (GrowStocksUser.error) return response.status(401).send(JSON.stringify({
        error: true,
        reason: "Invalid GrowStocks code."
      }));

      response.status(200).send(JSON.stringify({
        id: GrowStocksUser.id,
        username: GrowStocksUser.name,
        growid: GrowStocksUser.growid
      }));
    });
  }
}

module.exports = ApiRoutes;