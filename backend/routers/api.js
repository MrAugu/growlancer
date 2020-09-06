const User = require("../models/user");
const Avatar = require("../models/avatar");
const crypto = require("crypto");
const Banner = require("../models/banner");

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
        const [meta, content] = avatar.split(",");
        if (meta && content) {
          const type = meta.split(":")[1]?.split(";")[0];
          const hash = crypto.createHash("sha1")
            .update(content)
            .digest("hex");
          const newAvatar = new Avatar({
            type: type,
            hash: hash,
            for: user.id,
            content: content
          });
          await Avatar.deleteMany({
            for: user.id
          }).catch(()=>{});
          await newAvatar.save().catch(()=>{});
          avatar = hash;
        } else {
          avatar = null;
        }
      }

      if (banner) {
        const [meta, content] = banner.split(",");
        if (meta && content) {
          const type = meta.split(":")[1]?.split(";")[0];
          const hash = crypto.createHash("sha1")
            .update(content)
            .digest("hex");
          const newBanner = new Banner({
            type: type,
            hash: hash,
            for: user.id,
            content: content
          });
          await Banner.deleteMany({
            for: user.id
          }).catch(()=>{});
          await newBanner.save().catch(()=>{});
          banner = hash;
        } else {
          banner = null;
        }
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
  }
}

module.exports = ApiRoutes;