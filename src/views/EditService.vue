<template>
  <section>
    <Header v-bind:title="username" />
    <div class="page-loader" v-if="!loaded"><div class="page-pulse"><div></div><div></div><div></div></div></div>
    <h1 class="head-title-underline" v-if="loaded"><i class="fas fa-info-plus icon"></i> Edit Service</h1>
    <form class="form" v-if="loaded">
      <div class="form-field">
        <p class="form-field-title"><span v-html="check(this.data.cardBanner || !!cardBannerInputValue, cardBannerInputText !== `<i class='fas fa-image'></i> Select an image`)"></span> Service Card Banner</p>
        <p class="form-field-title-description">A smaller banner that will be shown on the service card as a listing, max size 4 megabyte.</p>
        <input type="file" class="form-field-file-input" @change="cardBannerUpdate" ref="cardbanner" id="card-banner">
        <label for="card-banner" v-html="cardBannerInputText" class="form-field-file-input-label"></label>
      </div>
      <div class="form-field">
        <p class="form-field-title"><span v-html="check(this.data.banner || !!serviceBannerInputValue, serviceBannerInputText !== `<i class='fas fa-image'></i> Select an image`)"></span> Service Banner</p>
        <p class="form-field-title-description">A full banner that will be shown on the service page, max size 5 megabyte.</p>
        <input type="file" class="form-field-file-input" @change="serviceBannerUpdate" ref="cardbanner" id="service-banner">
        <label for="service-banner" v-html="serviceBannerInputText" class="form-field-file-input-label"></label>
      </div>
      <div class="form-field">
        <p class="form-field-title"><span v-html="check(title.length > 9, title.length > 0)"></span> Service Title ({{ 40 - title.length }} Characters Left)</p>
        <p class="form-field-title-description">The title of your service, minimum 10 characters.</p>
        <input type="text" maxlength="40" v-model="title" class="form-field-text-input" placeholder="Music Translation Service" required>
      </div>
      <div class="form-field">
        <p class="form-field-title"><span v-html="check(shortDescription && shortDescription.length > 29, shortDescription.length > 0)"></span> Service Short Description ({{ 120 - shortDescription.length }} Characters Left)</p>
        <p class="form-field-title-description">The title of your service, minimum 30 characters.</p>
        <input type="text" maxlength="120" v-model="shortDescription" class="form-field-text-input" placeholder="Translating any songs from youtube/spotify to your own world!" required>
      </div>
      <div class="form-field">
        <p class="form-field-title"><span v-html="check(longDescription && longDescription.length > 99, longDescription.length > 0)"></span> Service Long Description ({{ 1500 - longDescription.length }} Characters Left)</p>
        <p class="form-field-title-description">Basic markdown supported. A long description of your service where you tell user what they need to know before ordering a tier of your service. Minimum 100 characters.</p>
        <textarea class="form-field-textarea" maxlength="1500" v-model="longDescription"></textarea>
      </div>
      <div class="form-field">
        <p class="form-field-title"><span v-html="check(validTiers > 0, tiers.length > 1)"></span> Tiers ({{ validTiers }} Valid Tier{{ validTiers !== 1 ? "s" : "" }})</p>
        <p class="form-field-title-description">Tiers are different options you can offer for this service, users can order tiers idividually, each with its own banner, title, description and price. The number of correct & valid tiers will show up - it required to have a title, a description and a banner. Tip: Tiers can cost 0 world locks and be free.</p>
        <div class="tier-wrapper">
          <div class="tier-card" v-for="(tier, index) in tiers" v-bind:key="index">
            <p class="btn-icon" style="cursor: pointer; position: absolute; top: 1em; right: 0.8em; float: right;" @click="tiers.splice(index, 1)">Delete Tier</p>
            <div class="form-field">
              <p class="form-field-title"><span v-html="check(tier.banner || !!tier.bannerValue, tier.bannerText !== `<i class='fas fa-image'></i> Select an image`)"></span> Tier Banner</p>
              <p class="form-field-title-description">This tier's banner.</p>
              <input type="file" class="form-field-file-input" @change="function (event) { updateTierBanner(event, index); }" v-bind:id="`${index}-tier-banner`">
              <label v-bind:for="`${index}-tier-banner`" v-html="tier.bannerText" class="form-field-file-input-label"></label>
            </div>
            <div class="form-field">
              <p class="form-field-title"><span v-html="check(tier.title.length > 4, tier.title.length > 0)"></span> Tier Title ({{ 40 - tier.title.length }} Chars Left)</p>
              <p class="form-field-title-description">The title of your service.</p>
              <input type="text" maxlength="40" v-model="tier.title" class="form-field-text-input" placeholder="Existing Translation Songs" required>
            </div>
            <div class="form-field">
              <p class="form-field-title"><span v-html="check(tier.description.length > 49, tier.description.length > 0)"></span> Tier Description ({{ 300 - tier.description.length }} Chars Left)</p>
              <p class="form-field-title-description">A basic description of this tier.</p>
              <textarea class="form-field-textarea" style="min-height: 60px!important; max-height: 60px!important;" maxlength="300" v-model="tier.description"></textarea>
            </div>
            <div class="form-field">
              <p class="form-field-title"><span v-html="check(!isNaN(parseInt(tier.cost)) && parseInt(tier.cost) > -1 && parseInt(tier.cost) < 10001, isNaN(parseInt(tier.cost)) || parseInt(tier.cost) < 0 || parseInt(tier.cost) > 10000)"></span> Tier Cost (in WLs)</p>
              <p class="form-field-title-description">The cost of this tier in world locks.</p>
              <input type="number" min="0" max="10000" v-model="tier.cost" class="form-field-text-input" placeholder="Amount of world locks." required>
            </div>
          <div/>
        </div>
        <div class="tier-card add-tier" v-if="tiers.length < 4" style="cursor: pointer;" @click="appendTier">
          <i class="fas fa-plus plus" style="text-align: center; vertical-align: middle; line-height: 497px; font-size: 8em;"></i>
        </div>
      </div>
      <div class="form-field">
        <p class="form-field-title"><span v-html="check(selectedKeywords.length > 1, selectedKeywords.length > 0)"></span> Keywords ({{ 5 - selectedKeywords.length }} KeyWords Available)</p>
        <p class="form-field-title-description">Keywords that will promote your service in the GrowLancer search. Maximum 5 of them.</p>
        <v-select :options="keywords" v-model="selectedKeywords" @input="limitKeywords" multiple></v-select>
      </div>
    </form>
    <Confirm v-bind:loading="saving" @save="save" @discard="discard" v-if="loaded && changed" />
    <Cookie />
  </section>
</template>

<script>
import Header from "@/components/Header.vue";
import Cookie from "@/components/Cookie.vue";
import Confirm from "@/components/Confirm.vue";

export default {
  name: "EditService",
  components: {
    Header,
    Cookie,
    Confirm
  },
  computed: {
    validTiers: function () {
      const validTiers = [];

      for (const tier of this.tiers) {
        if (tier.title.length > 4 && tier.description.length > 49 && (tier.banner || !!tier.bannerValue) && !isNaN(parseInt(tier.cost)) && parseInt(tier.cost) > -1 && parseInt(tier.cost) < 10001) validTiers.push(tier);
      }

      return validTiers.length;
    },
    changed: function () {
      if (this.title !== this.data.title) return true;
      if (this.cardBannerInputValue) return true;
      if (this.serviceBannerInputValue) return true;
      if (this.shortDescription !== this.data.shortDescription) return true;
      if (this.longDescription !== this.data.longDescription) return true;
      if (this.differentKeywords) return true;
      const validTiers = this.listValidTiers();
      console.log(validTiers);
      if (validTiers.length !== this.data.tiers.length) return true;
      
      for (var i = 0; i < validTiers.length; i++) {
        const dataTier = this.data.tiers[i];
        const liveTier = this.tiers[i];

        if (dataTier.title != liveTier.title) return true;
        if (dataTier.banner != liveTier.banner) return true;
        if (dataTier.description != liveTier.description) return true;
        if (dataTier.banner && liveTier.bannerValue) return true;
        if (dataTier.cost != liveTier.cost) return true;
      }

      return false;
    },
    differentKeywords: function () {
      for (const keyword of this.selectedKeywords) {
        if (!this.data.keywords.includes(keyword.value)) return true;
      }

      for (const keyword of this.data.keywords) {
        if (!this.selectedKeywords.map(k => k.value).includes(keyword)) return true;
      }

      return false;
    },
    creatable: function () {
      const conditions = [
        (this.title.length > 9),
        (this.shortDescription.length > 29),
        (this.longDescription.length > 99),
        (this.validTiers > 0),
        (this.selectedKeywords.length > 1)
      ];

      return conditions.some(condition => condition === false) ? false : true;
    },
    saveText: function () {
      if (this.submiting) {
        return this.buttonText;
      } else if (this.creatable) {
        return "<i class='fas fa-check'></i> Create Service";
      } else {
        return "<i class='fas fa-lock'></i> Create Service";
      }
    }
  },
  data () {
    return {
      loaded: false,
      title: "",
      data: {},
      cardBannerInputText: "<i class='fas fa-image'></i> Update image",
      cardBannerInputValue: null,
      serviceBannerInputText: "<i class='fas fa-image'></i> Update image",
      serviceBannerInputValue: null,
      longDescription: "",
      shortDescription: "",
      tiers: [
        {
          title: "",
          description: "",
          cost: 0,
          bannerValue: null,
          bannerText: "<i class='fas fa-image'></i> Select an image"
        }
      ],
      keywords: [
        "Music",
        "Design",
        "Composing",
        "Farming",
        "Building",
        "Graphics",
        "Art",
        "Carnival",
        "Harvest",
        "Commission",
        "Valentine",
        "Winter",
        "Daily",
        "Quest",
        "Break",
        "Gems",
        "Middleman",
        "Image",
        "Video",
        "Editing",
        "Halloween",
        "Free"
        ].map(item => ({ label: item, value: item })),
      selectedKeywords: [],
      saving: false
    }
  },
  methods: {
    listValidTiers: function () {
      const validTiers = [];

      for (const tier of this.tiers) {
        if (tier.title.length > 4 && tier.description.length > 49 && (tier.banner || !!tier.bannerValue) && !isNaN(parseInt(tier.cost)) && parseInt(tier.cost) > -1 && parseInt(tier.cost) < 10001) validTiers.push(tier);
      }

      return validTiers;
    },
    discard: async function () {
      this.title = this.data.title;
      this.shortDescription = this.data.shortDescription;
      this.longDescription = this.data.longDescription;
      this.tiers = this.data.tiers.map(tier => ({
        title: tier.title,
        description: tier.description,
        cost: tier.cost,
        banner: tier.banner,
        bannerText: `<i class='fas fa-image'></i> Update Image`,
        bannerValue: null
      }));
      this.selectedKeywords = this.data.keywords.map(key => ({ label: key, value: key }));
      this.cardBannerInputText = "<i class='fas fa-image'></i> Select an image";
      this.cardBannerInputValue = null;
      this.serviceBannerInputText = "<i class='fas fa-image'></i> Select an image";
      this.serviceBannerInputValue = null;
    },
    save: async function () {
      this.loading = true;

      const requestBody = {
        "title": this.title,
        "shortDescription": this.shortDescription,
        "longDescription": this.longDescription,
        "keywords": this.selectedKeywords.map(selected => selected.value),
        "tiers": [],
        "cardBanner": null,
        "serviceBanner": null
      };

      for (const tier of this.listValidTiers()) {
        const tierObj = {
          "title": tier.title,
          "description": tier.description,
          "cost": parseInt(tier.cost),
          "banner": null
        };

        if (tier.bannerValue) {
          const tierBanner = await this.fileBase(tier.bannerValue);
          tierObj["banner"] = tierBanner;
        } else {
          tierObj["banner"] = tier.banner;
        }

        requestBody.tiers.push(tierObj);
      }

      if (this.cardBannerInputValue) {
        const cardBanner = await this.fileBase(this.cardBannerInputValue);
        requestBody["cardBanner"] = cardBanner;
      }

      if (this.serviceBannerInputValue) {
        const serviceBanner = await this.fileBase(this.serviceBannerInputValue);
        requestBody["serviceBanner"] = serviceBanner;
      }

      const x = await this.$axios.post(`${this.$apiBase}/services/update/${this.data.id}`, requestBody, {
        withCredentials: true,
        credentials: "same-origin"
      });

      console.log(x.data);

      this.loadData();
    },
    loadData: async function () {
      const locationArray =  window.location.href.split("/");
      const id = locationArray[locationArray.length - 1];

      const serviceData = await this.$axios.get(`${this.$apiBase}/fetch/service/${id}`, {
        withCredentials: true,
        credentials: "same-origin"
      });
      this.data = serviceData.data.service;

      this.title = this.data.title;
      this.shortDescription = this.data.shortDescription;
      this.longDescription = this.data.longDescription;
      this.tiers = this.data.tiers.map(tier => ({
        title: tier.title,
        description: tier.description,
        cost: tier.cost,
        banner: tier.banner,
        bannerText: `<i class='fas fa-image'></i> Update Image`,
        bannerValue: null
      }));
      this.selectedKeywords = this.data.keywords.map(key => ({ label: key, value: key }));
      this.loaded = true;
    },
    check: function (condition, counterCondition) {
      if (condition) {
        return "<span class='green-label'><i class='fas fa-check-circle'></i></span>";
      } else if (counterCondition) {
        return "<span class='red-label'><i class='fas fa-times-circle'></i></span>";
      }
    },
    limitKeywords: function (input) {
      if (input.length > 5) {
        input.pop();
      }
    },
    appendTier: function () {
      this.tiers.push({ title: "", description: "", cost: 0, bannerValue: null, bannerText: "<i class='fas fa-image'></i> Select an image" });
    },
    updateTierBanner: function (event, index) {
      const input = event.target;
      const file = input.files[0];

      if (!file) {
        this.tiers[index].bannerText = `<i class='fas fa-image'></i> Select an image`;
        this.tiers[index].bannerValue = null;
      } else if (!file.type.startsWith("image")) {
        this.tiers[index].bannerValue = null;
        this.tiers[index].bannerText = `<i class='fas fa-exclamation-triangle'></i> Select an image file`;
        input.value = "";
      } else if (file.size > 4000000) {
        this.tiers[index].bannerText = `<i class='fas fa-exclamation-triangle'></i> Select an image, maximum 4 megabytes`;
        this.tiers[index].bannerValue = null;
      } else {
        this.tiers[index].bannerText = `<i class='fas fa-image'></i> ${file.name}`;
        this.tiers[index].bannerValue = file;
      }
    },
    cardBannerUpdate: function (event) {
      const input = event.target;
      const file = input.files[0];

      if (!file) {
        this.cardBannerInputText = `<i class='fas fa-image'></i> Select an image`;
        this.cardBannerInputValue = null;
      } else if (!file.type.startsWith("image")) {
        this.cardBannerInputValue = null;
        this.cardBannerInputText = `<i class='fas fa-exclamation-triangle'></i> Select an image file`;
        input.value = "";
      } else if (file.size > 4000000) {
        this.cardBannerInputText = `<i class='fas fa-exclamation-triangle'></i> Select an image, maximum 4 megabytes`;
        this.cardBannerInputValue = null;
      } else {
        this.cardBannerInputText = `<i class='fas fa-image'></i> ${file.name}`;
        this.cardBannerInputValue = file;
      }
    },
    serviceBannerUpdate: function (event) {
      const input = event.target;
      const file = input.files[0];

      if (!file) {
        this.serviceBannerInputText = `<i class='fas fa-image'></i> Select an image`;
        this.serviceBannerInputValue = null;
      } else if (!file.type.startsWith("image")) {
        this.serviceBannerInputValue = null;
        this.serviceBannerInputText = `<i class='fas fa-exclamation-triangle'></i> Select an image file`;
        input.value = "";
      } else if (file.size > 4000000) {
        this.serviceBannerInputText = `<i class='fas fa-exclamation-triangle'></i> Select an image, maximum 5 megabytes`;
        this.serviceBannerInputValue = null;
      } else {
        this.serviceBannerInputText = `<i class='fas fa-image'></i> ${file.name}`;
        this.serviceBannerInputValue = file;
      }
    },
    fileBase: function (file) {
      return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
        const reader = new FileReader();
        reader.onload = function (event) {
          resolve(event.target.result);
        }
        reader.readAsDataURL(file);
      });
    }
  },
  mounted () {
    this.loadData();
  }
}
</script>

<style>
  .form-field {
    width: 100%;
  }

  .green-label {
    color: #30c552;
  }

  .red-label {
    color: #dc3545;
  }
</style>