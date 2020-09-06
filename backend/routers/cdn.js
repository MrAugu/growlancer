const Avatar = require("../models/avatar");
const Banner = require("../models/banner");

class CdnRoutes {
  constructor (website) {
    website.app.get("/cdn/avatars/:hash", async (request, response) => {
      const avatar = await Avatar.findOne({
        hash: request.params.hash
      });

      if (!avatar) {
        response.setHeader("Content-Type", "application/json");
        return response.send(JSON.stringify({
          error: true,
          code: 404,
          reason: "Resource not found."
        }, null, 2));
      } else {
        const avatarBuffer = new Buffer.from(avatar.content, "base64");
        response.setHeader("Content-Type", avatar.type);
        return response.send(avatarBuffer);
      }
    });

    website.app.get("/cdn/banners/:hash", async (request, response) => {
      const banner = await Banner.findOne({
        hash: request.params.hash
      });

      if (!banner) {
        response.setHeader("Content-Type", "application/json");
        return response.send(JSON.stringify({
          error: true,
          code: 404,
          reason: "Resource not found."
        }, null, 2));
      } else {
        const bannerBuffer = new Buffer.from(banner.content, "base64");
        response.setHeader("Content-Type", banner.type);
        return response.send(bannerBuffer);
      }
    });
  }
}

module.exports = CdnRoutes;