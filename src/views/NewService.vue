<template>
  <section>
    <Header v-bind:title="username" />
    <div class="page-loader" v-if="!loaded"><div class="page-pulse"><div></div><div></div><div></div></div></div>
    <h1 class="head-title-underline" v-if="loaded"><i class="fas fa-info-plus icon"></i> New Service</h1>
    <form class="form" v-if="loaded">
      <div class="form-field">
        <p class="form-field-title">Service Card Banner</p>
        <p class="form-field-title-description">A smaller banner that will be shown on the service card as a listing, max size 4 megabyte.</p>
        <input type="file" class="form-field-file-input" @change="cardBannerUpdate" ref="cardbanner" id="card-banner">
        <label for="card-banner" v-html="cardBannerInputText" class="form-field-file-input-label"></label>
      </div>
      <div class="form-field">
        <p class="form-field-title">Service Banner</p>
        <p class="form-field-title-description">A full banner that will be shown on the service page, max size 5 megabyte.</p>
        <input type="file" class="form-field-file-input" @change="serviceBannerUpdate" ref="cardbanner" id="service-banner">
        <label for="service-banner" v-html="serviceBannerInputText" class="form-field-file-input-label"></label>
      </div>
      <div class="form-field">
        <p class="form-field-title">Service Title ({{ 40 - title.length }} Characters Left)</p>
        <p class="form-field-title-description">The title of your service, maximum 45 characters long.</p>
        <input type="text" maxlength="40" v-model="title" class="form-field-text-input" placeholder="Music Translation Service" required>
      </div>
      <div class="form-field">
        <p class="form-field-title">Service Small Description ({{ 120 - shortDescription.length }} Characters Left)</p>
        <p class="form-field-title-description">The title of your service, maximum 120 characters long.</p>
        <input type="text" maxlength="120" v-model="shortDescription" class="form-field-text-input" placeholder="Translating any songs from youtube/spotify to your own world!" required>
      </div>
      <div class="form-field">
        <p class="form-field-title">Service Long Description ({{ 1500 - longDescription.length }} Characters Left)</p>
        <p class="form-field-title-description">Basic markdown supported. A long description of your service where you tell user what they need to know before ordering a tier of your service.</p>
        <textarea class="form-field-textarea" maxlength="1500" v-model="longDescription"></textarea>
      </div>
      <div class="form-field">
        <p class="form-field-title">Tiers</p>
        <p class="form-field-title-description">Tiers are different options you can offer for this service, users can order tiers idividually, each with its own banner, title, description and price.</p>
        <div class="tier-wrapper">
          <div class="tier-card" v-for="(tier, index) in tiers" v-bind:key="index">
            <div class="form-field">
              <p class="form-field-title">Tier Banner</p>
              <p class="form-field-title-description">The banner that will be shown on the tier, maximum size 4 megabytes.</p>
              <input type="file" class="form-field-file-input" @change="function (event) { updateTierBanner(event, index); }" v-bind:id="`${index}-tier-banner`">
              <label v-bind:for="`${index}-tier-banner`" v-html="tier.bannerText" class="form-field-file-input-label"></label>
            </div>
            <div class="form-field">
              <p class="form-field-title">Tier Title ({{ 40 - tier.title.length }} Chars Left)</p>
              <p class="form-field-title-description">The title of your service.</p>
              <input type="text" maxlength="40" v-model="tier.title" class="form-field-text-input" placeholder="Existing Translation Songs" required>
            </div>
            <div class="form-field">
              <p class="form-field-title">Tier Description ({{ 300 - tier.description.length }} Chars Left)</p>
              <p class="form-field-title-description">A basic description of this tier.</p>
              <textarea class="form-field-textarea" style="min-height: 80px!important; max-height: 80px!important;" maxlength="300" v-model="tier.description"></textarea>
            </div>
            <div class="form-field">
              <p class="form-field-title">Tier Const (in WLs)</p>
              <p class="form-field-title-description">The cost of this tier in world locks.</p>
              <input type="text" min="0" max="10000" v-model="tier.cost" class="form-field-text-input" placeholder="Amount of world locks." required>
            </div>
            <p class="btn-icon" style="width: 100%; cursor: pointer;" @click="tiers.splice(index, 1)">Delete Tier</p>
          <div/>
        </div>
        <div class="tier-card add-tier" style="cursor: pointer;" @click="appendTier">
          <i class="far fa-plus-square" style="text-align: center; vertical-align: middle; line-height: 658px; font-size: 4em;"></i>
        </div>
      </div>
    </form>
    <Cookie />
  </section>
</template>

<script>
import Header from "@/components/Header.vue";
import Cookie from "@/components/Cookie.vue";

export default {
  name: "NewService",
  components: {
    Header,
    Cookie
  },
  data () {
    return {
      loaded: false,
      title: "",
      cardBannerInputText: "<i class='fas fa-image'></i> Select an image",
      cardBannerInputValue: null,
      serviceBannerInputText: "<i class='fas fa-image'></i> Select an image",
      serviceBannerInputValue: null,
      longDescription: "",
      shortDescription: "",
      tiers: [{ title: "", description: "", cost: 0, bannerValue: null, bannerText: "<i class='fas fa-image'></i> Select an image" }]
    }
  },
  methods: {
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
    setTimeout(() => {
      this.loaded = true;
    }, 1000);
  }
}
</script>

<style>
  .form-field {
    width: 100%;
  }
</style>