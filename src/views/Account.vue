<template>
  <section>
    <Header v-bind:title="username" />
    <div class="page-loader" v-if="!loaded"><div class="page-pulse"><div></div><div></div><div></div></div></div>
    <h1 class="head-title-underline" v-if="loaded"><i class="fas fa-info-circle icon"></i> My Account</h1>
    <form class="form" v-if="loaded">
      <div class="form-field">
        <p class="form-field-title">Avatar</p>
        <p class="form-field-title-description">Your profile picture which will slow on the website publically, max size 3 megabytes.</p>
        <input type="file" class="form-field-file-input" @change="avatarUpdate" ref="avatar" id="avatar-file">
        <label for="avatar-file" v-html="avatarInputText" class="form-field-file-input-label"></label>
      </div>
      <div class="form-field">
        <p class="form-field-title">Bio</p>
        <p class="form-field-title-description">A text of maxim 100 characters birefly describing you.</p>
        <textarea class="form-field-textarea" @input="update()" v-model="bio" placeholder="I'm a mysterious person."></textarea>
      </div>
      <div class="form-field">
        <p class="form-field-title">Banner</p>
        <p class="form-field-title-description">Your profile banner which will slow on your profile publically, max size 5 megabytes.</p>
        <input type="file" class="form-field-file-input" @change="bannerUpdate" ref="banner" id="banner-file">
        <label for="banner-file" v-html="bannerInputText" class="form-field-file-input-label"></label>
      </div>
    </form>
    <Confirm v-bind:loading="saving" @save="save" @discard="discard" v-if="changed" />
    <Cookie />
  </section>
</template>

<script>
import Header from "@/components/Header.vue";
import Cookie from "@/components/Cookie.vue";
import Confirm from "@/components/Confirm.vue";
import { mapGetters } from "vuex";

export default {
  name: "Account",
  computed: mapGetters(["id", "username"]),
  components: {
    Header,
    Cookie,
    Confirm
  },
  data () {
    return {
      data: {},
      loaded: false,
      bio: null,
      changed: false,
      saving: false,
      avatarInputText: "<i class='fas fa-image'></i> Choose a profile picture",
      avatarInputValue: null,
      bannerInputText: "<i class='fas fa-image'></i> Choose a banner picture",
      bannerInputValue: null
    }
  },
  methods: {
    loadProfileData: async function () {
      const user = await this.$axios.get(`${this.$apiBase}/fetch/user/${this.id}`, {
        withCredentials: true,
        credentials: "same-origin"
      });

      if (user.data.exists) {
        this.data = user.data.user;
        this.loaded = true;
      } else {
        window.location.href = "/login";
      }

      this.init();
    },
    init: function () {
      this.bio = this.data.bio;
    },
    update: function () {
      if (this.bio !== this.data.bio || this.avatarInputValue !== null || this.bannerInputValue !== null) {
        this.changed = true;
      } else {
        this.changed = false;
      }
    },
    save: function () {
      this.saving = true;
      /** Saving code. */
    },
    discard: function () {
      this.init();

      this.avatarInputValue = null;
      this.avatarInputText = "<i class='fas fa-image'></i> Choose a profile picture";
      this.$refs.avatar.value = "";

      this.bannerInputValue = null;
      this.bannerInputText = "<i class='fas fa-image'></i> Choose a banner picture";
      this.$refs.banner.value = "";

      this.changed = false;
    },
    avatarUpdate: function (event) {
      const input = event.target;
      const file = input.files[0];

      if (!file) {
        this.avatarInputText = "<i class='fas fa-image'></i> Choose a profile picture";
        this.avatarInputValue = null;
      } else if (!file.type.startsWith("image")) {
        this.avatarInputValue = null;
        this.avatarInputText = "<i class='fas fa-exclamation-triangle'></i> Choose a profile picture";
        input.value = "";
      } else if (file.size > 3000000) {
        this.avatarInputText = `<i class='fas fa-exclamation-triangle'></i> Chose a profile picture (Max. 3MB)`;
        this.avatarInputValue = null;
      } else {
        this.avatarInputText = `<i class='fas fa-image'></i> ${file.name}`;
        this.avatarInputValue = file;
      }
      this.update();
    },
    bannerUpdate: function (event) {
      const input = event.target;
      const file = input.files[0];

      if (!file) {
        this.bannerInputText = "<i class='fas fa-image'></i> Choose a banner picture";
        this.bannerInputText = null;
      } else if (!file.type.startsWith("image")) {
       this.bannerInputValue = null;
       this.bannerInputText = "<i class='fas fa-exclamation-triangle'></i> Choose a banner picture";
       input.value = "";
      } else if (file.size > 5000000) {
        this.bannerInputText = `<i class='fas fa-exclamation-triangle'></i> Chose a banner picture (Max. 5MB)`;
        this.bannerInputValue = null;
      } else {
        this.bannerInputText = `<i class='fas fa-image'></i> ${file.name}`;
        this.bannerInputValue = file;
      }
      this.update();
    }
  },
  mounted () {
    this.loadProfileData();
  }
}
</script>
