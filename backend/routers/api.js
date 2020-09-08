const User = require("../models/user");
const Avatar = require("../models/avatar");
const crypto = require("crypto");
const Banner = require("../models/banner");
const TierBanner = require("../models/tierBanner");
const ServiceBanner = require("../models/serviceBanner");
const CardBanner = require("../models/cardBanner");
const Service = require("../models/service");

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

    website.app.get("/api/fetch/service/:id", async (request, response) => {
      const service = await Service.findOne({
        id: request.params.id
      });

      response.setHeader("Content-Type", "application/json");
      if (!service) return response.send(JSON.stringify({
        error: true,
        code: 404
      }));

      response.send(JSON.stringify({
        error: false,
        code: 200,
        service: service
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

    website.app.post("/api/user/:id", website.authenticate, async (request, response) => {
      if (request.user.id != parseInt(request.params.id, 10)) return response.send(JSON.stringify({
        error: true,
        code: 401
      }));
    
      const user = await User.findOne({
        id: parseInt(request.params.id, 10)
      });

      if (!user) return response.send(JSON.stringify({
        error: true,
        code: 404
      }));

      const bio = request.body.bio || "I'm a mysterious person.";
      var avatar = request.body.avatar || null;
      var banner = request.body.banner || null;

      if (avatar) {
        await Avatar.deleteMany({
          for: user.id
        }).catch(()=>{});
        avatar = await uploadFile(Avatar, avatar, user.id);
      }

      if (banner) {
        await Banner.deleteMany({
          for: user.id
        }).catch(()=>{});
        banner = await uploadFile(Banner, banner, user.id);
      }

      user.bio = bio.trim().slice(0, 100);
      if (banner) user.banner = banner;
      if (avatar) user.avatar = avatar;

      await user.save().catch(()=>{});

      return response.send(JSON.stringify({
        error: false,
        code: 200,
        bio: true,
        banner: banner ? true : false,
        avatar: avatar ? true : false
      }));
    });

    website.app.post("/api/services/new", website.authenticate, async (request, response) => {
      var title = request.body.title || null;
      var shortDescription = request.body.shortDescription || null;
      var longDescription = request.body.longDescription || null;
      var cardBanner = request.body.cardBanner || null;
      var serviceBanner = request.body.serviceBanner || null;
      var tiers = request.body.tiers || null;
      var keywords = request.body.keywords || null;

      tiers = tiers.filter(tier => tier.title && tier.description && tier.banner && !isNaN(tier.cost));

      const showBadRequest = [
        !title,
        !shortDescription,
        !longDescription,
        !cardBanner,
        !serviceBanner,
        !tiers || !tiers.length,
        title.length > 40,
        title.length < 10,
        tiers.length > 4,
        shortDescription.length > 120,
        shortDescription.length < 30,
        longDescription.length > 1000,
        longDescription.length < 100,
        keywords.length > 5,
        keywords.length < 2
      ].some(c => c === true);

      if (showBadRequest) return response.send(JSON.stringify({
        error: true,
        code: 400
      }));

      const serviceID = Date.now().toString(36);

      const promiseArray = [
        uploadFile(ServiceBanner, serviceBanner, serviceID),
        uploadFile(CardBanner, cardBanner, serviceID)
      ];

      for (const tier of tiers) {
        promiseArray.push(uploadFile(TierBanner, tier.banner, serviceID));
      }

      var fileUploads;
  
      try {
        fileUploads = await Promise.all(promiseArray);
      } catch (e) {
        return response.send(JSON.stringify({
          error: true,
          code: 400
        }));
      }

      serviceBanner = fileUploads[0];
      cardBanner = fileUploads[1];

      for (var i = 2; i < fileUploads.length; i++) {
        tiers[i - 2].banner = fileUploads[i];
      }

      const newService = new Service({
        id: serviceID,
        owner: request.user.id,
        title: title,
        shortDescription: shortDescription,
        longDescription: longDescription,
        banner: serviceBanner,
        cardBanner: cardBanner,
        tiers: tiers,
        created: Date.now(),
        keywords: keywords
      });

      await newService.save().catch(()=>{});

      return response.send(JSON.stringify({
        error: false,
        code: 200,
        serviceID: serviceID,
        banner: serviceBanner,
        cardBanner: cardBanner,
        tierBanners: tiers.map(t => t.banner),
        owner: request.user.id,
        created: Date.now()
      }));
    });

    website.app.post("/api/services/update/:id", website.authenticate, async (request, response) => {
      const service = await Service.findOne({
        id: request.params.id
      });

      if (!service) return response.send(JSON.stringify({
        error: true,
        code: 404
      }));

      var title = request.body.title || null;
      var shortDescription = request.body.shortDescription || null;
      var longDescription = request.body.longDescription || null;
      var cardBanner = request.body.cardBanner || null;
      var serviceBanner = request.body.serviceBanner || null;
      var tiers = request.body.tiers || null;
      var keywords = request.body.keywords || null;

      tiers = tiers.filter(tier => tier.title && tier.description && tier.banner && !isNaN(tier.cost));

      const showBadRequest = [
        !title,
        !shortDescription,
        !longDescription,
        !tiers || !tiers.length,
        title.length > 40,
        title.length < 10,
        tiers.length > 4,
        shortDescription.length > 120,
        shortDescription.length < 30,
        longDescription.length > 1000,
        longDescription.length < 100,
        keywords.length > 5,
        keywords.length < 2
      ].some(c => c === true);

      if (showBadRequest) return response.send(JSON.stringify({
        error: true,
        code: 400
      }));

      if (cardBanner) cardBanner = await uploadFile(CardBanner, cardBanner, service.id);
      if (serviceBanner) serviceBanner = await uploadFile(ServiceBanner, serviceBanner, service.id);

      const parsedTiers = [];

      var tierAssets = await TierBanner.find({
        for: service.id
      });
      tierAssets = tierAssets.map(tier => tier.hash);

      for (const tier of tiers) {
        var banner;
        if (tier.banner.split(";").length > 1) {
          banner = await uploadFile(TierBanner, tier.banner, service.id);
        } else {
          banner = tier.banner;
        }

        if (tierAssets.includes(banner)) {
          const indx = tierAssets.findIndex(asset => asset === banner);
          tierAssets.splice(indx, 1);
        }

        const tierObj = {
          "title": tier.title.slice(0, 40),
          "description": tier.description.slice(0, 300),
          "cost": tier.cost,
          "banner": banner
        };

        parsedTiers.push(tierObj);
      }

      for (const tierAsset of tierAssets) {
        console.log(tierAsset);
        await TierBanner.findOneAndDelete({
          hash: tierAsset
        }).catch(() => {});
      }

      service.title = title;
      service.shortDescription = shortDescription;
      service.longDescription = longDescription;
      if (cardBanner) service.cardBanner = cardBanner;
      if (serviceBanner) service.banner = serviceBanner;
      service.keywords = keywords;
      service.tiers = parsedTiers;

      await service.save().catch(()=>{});

      return response.send(JSON.stringify({
        code: 200,
        error: false
      }));
    });
  }
}

module.exports = ApiRoutes;

async function uploadFile (Model, file, who) {
  const [meta, content] = file.split(",");
  const type = meta.split(":")[1]?.split(";")[0];
  const hash = crypto.createHash("sha1")
    .update(content)
    .digest("hex");
  const dbFile = new Model({
    type: type,
    hash: hash,
    for: who,
    content: content
  });
  await dbFile.save();
  return hash;
}