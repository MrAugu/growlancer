const Avatar = require("../models/avatar");
const Banner = require("../models/banner");
const CardBanner = require("../models/cardBanner");
const TierBanner = require("../models/tierBanner");
const ServiceBanner = require("../models/serviceBanner");

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

    website.app.get("/cdn/card/banner/:hash", async (request, response) => {
      const banner = await CardBanner.findOne({
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

    website.app.get("/cdn/tier/banner/:hash", async (request, response) => {
      const banner = await TierBanner.findOne({
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

    website.app.get("/cdn/service/banner/:hash", async (request, response) => {
      const banner = await ServiceBanner.findOne({
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