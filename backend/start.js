const Website = require("./index");
const site = new Website({
  port: 3030
});

(async function () {
  await site.loadMiddleware();
  await site.loadRoutes();
  await site.startUp();
}())