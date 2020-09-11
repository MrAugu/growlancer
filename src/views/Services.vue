<template>
  <section>
    <Header v-bind:title="`${username}'s Services`" />
    <div class="page-loader" v-if="!loaded"><div class="page-pulse"><div></div><div></div><div></div></div></div>
    <h3 style="text-align: center;" v-if="(data) && (data.unapproved && data.visible && data.invisible) && (data.unapproved.length < 1) && (data.visible.length < 1) && (data.invisible.length < 1)">You have not registered any services yet on the website, please <a class="link" href="/services/new">create a new service</a>.</h3>
    <div style="margin-top: 1em;" v-if="loaded && ((data.unapproved && data.unapproved.length) || (data.visible && data.visible.length) || (data.invisible && data.invisible.length))">
      <div style="text-align: center;" v-if="data.unapproved.length > 0">
        <p class="service-section-title">Pending Approval Services ({{ data.unapproved.length }})</p>
        <p class="service-section-description">Your list of services which are pending approval by moderators.</p>
        <div class="service-wrapper">
          <div class="service-card" v-for="service of data.unapproved" v-bind:key="service.id">
            <img class="service-card-banner" v-bind:src="`${baseUrl}/cdn/card/banner/${service.cardBanner}`">
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-keywords">{{ service.keywords.join(", ") }}</p>
            <div class="service-description"><p class="service-description-content">{{ service.shortDescription }}</p></div>
            <div class="star-wrap">{{ "★".repeat(Math.floor(service.rating)) }}{{ "☆".repeat(5 - Math.floor(service.rating)) }} {{ service.rating.toFixed(1) }} <span class="small">({{ service.rates.length }} Ratings)</span></div>
            <div class="service-owner">
              <img v-bind:src="`${baseUrl}/cdn/avatars/${data.owner.avatar}`" alt="serviceowner.png" class="owner-avatar">
              <p class="owner-name">{{ data.owner.username }}</p>
              <p class="owner-join">{{ joinTime(data.owner.joined) }}</p>
            </div>
            <p class="service-range">{{ (Math.min(...service.tiers.map(t => t.cost))).toLocaleString() }} - {{ (Math.max(...service.tiers.map(t => t.cost))).toLocaleString() }}</p>
            <p class="service-range-text">World Locks</p>
            <p class="service-range-icon"><i class="fas fa-lock"></i></p>
          </div>
        </div>
      </div>
      <div style="text-align: center;" v-if="data.visible.length > 0">
        <p class="service-section-title">Visible Services ({{ data.visible.length }})</p>
        <p class="service-section-description">Your list of services visible on the website.</p>
        <div class="service-wrapper">
          
        </div>
      </div>
      <div style="text-align: center;" v-if="data.invisible.length > 0">
        <p class="service-section-title">Invisible Services ({{ data.invisible.length }})</p>
        <p class="service-section-description">Your list of hidden services on the website.</p>
        <div class="service-wrapper">

        </div>
      </div>
    </div>
    <Cookie />
  </section>
</template>

<script>
import Header from "@/components/Header.vue";
import Cookie from "@/components/Cookie.vue";
import { mapGetters } from "vuex";

export default {
  name: "Services",
  computed: mapGetters(["id", "username"]),
  components: {
    Header,
    Cookie
  },
  data () {
    return {
      data: {},
      loaded: false,
      baseUrl: this.$apiBase.split("/").slice(0, 3).join("/")
    }
  },
  methods: {
    joinTime: function (timestamp) {
      const date = new Date(timestamp);
      return `Joined ${date.getUTCDate()}/${date.getMonth()}/${date.getUTCFullYear()}`;
    },
    loadServiceData: async function () {
      const user = await this.$axios.get(`${this.$apiBase}/fetch/services/user/${this.id}`, {
        withCredentials: true,
        credentials: "same-origin"
      });

      if (user.data.exists) {
        this.data = user.data.services;
        this.loaded = true;
        console.log(this.data);
      } else {
        window.location.href = "/login";
      }
    },
  },
  mounted () {
    this.loadServiceData();
  }
}
</script>