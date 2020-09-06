<template>
  <section>
    <Header v-bind:title="username" />
    <div class="page-loader" v-if="!loaded"><div class="page-pulse"><div></div><div></div><div></div></div></div>
    <h1 class="head-title-underline" v-if="loaded"><i class="fas fa-info-circle icon"></i> My Account</h1>
    <form class="form" v-if="loaded">
      <div class="form-field">
        <p class="form-field-title">Avatar</p>
        <img v-if="loaded && data.avatar" v-bind:src="avatarURL" style="margin-top: 0.5em; margin-bottom: 0.5em; border-radius: 50%; height: 50px; width: 50px;">
        <p class="form-field-title-description">Your profile picture which will slow on the website publically, max size 3 megabyte.</p>
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
      bannerInputValue: null,
      avatarURL: null
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
      this.avatarInputText = `<i class='fas fa-image'></i> Choose a${this.data.avatar ? " new" : ""} profile picture`;
      this.bannerInputText = `<i class='fas fa-image'></i> Choose a${this.data.banner ? " new" : ""} banner picture`;
      this.avatarURL = `${this.$apiBase.split("/").slice(0, 3).join("/")}/cdn/avatars/${this.data.avatar}`;
    },
    update: function () {
      if (this.bio !== this.data.bio || this.avatarInputValue !== null || this.bannerInputValue !== null) {
        this.changed = true;
      } else {
        this.changed = false;
      }
    },
    save: async function () {
      this.saving = true;

      var avatarData;
      var bannerData; 

      if (this.avatarInputValue) {
        avatarData = await this.fileBase(this.avatarInputValue);
      }

      if (this.bannerInputValue) {
        bannerData = await this.fileBase(this.bannerInputValue);
      }

      const saveResponse = await this.$axios.post(`${this.$apiBase}/user/${this.data.id}`, {
        "bio": this.bio,
        "avatar": avatarData ? avatarData : null,
        "banner": bannerData ? bannerData : null
      }, {
        withCredentials: true,
        credentials: "same-origin"
      });

      await this.loadProfileData();

      this.avatarInputValue = null;
      this.avatarInputText = `<i class='fas fa-image'></i> Choose a${this.data.avatar ? " new" : ""} profile picture`;
      this.$refs.avatar.value = "";

      this.bannerInputValue = null;
      this.bannerInputText = `<i class='fas fa-image'></i> Choose a${this.data.banner ? " new" : ""} banner picture`;
      this.$refs.banner.value = "";

      console.log(saveResponse.data);
      this.changed = false;
      this.saving = false;
    },
    discard: function () {
      this.init();

      this.avatarInputValue = null;
      this.avatarInputText = `<i class='fas fa-image'></i> Choose a${this.data.avatar ? " new" : ""} profile picture`;
      this.$refs.avatar.value = "";

      this.bannerInputValue = null;
      this.bannerInputText = `<i class='fas fa-image'></i> Choose a${this.data.banner ? " new" : ""} banner picture`;
      this.$refs.banner.value = "";

      this.changed = false;
    },
    avatarUpdate: function (event) {
      const input = event.target;
      const file = input.files[0];

      if (!file) {
        this.avatarInputText = `<i class='fas fa-image'></i> Choose a${this.data.avatar ? " new" : ""} profile picture`;
        this.avatarInputValue = null;
      } else if (!file.type.startsWith("image")) {
        this.avatarInputValue = null;
        this.avatarInputText = `<i class='fas fa-exclamation-triangle'></i> Choose a${this.data.avatar ? " new" : ""} profile picture`;
        input.value = "";
      } else if (file.size > 3000000) {
        this.avatarInputText = `<i class='fas fa-exclamation-triangle'></i> Chose a${this.data.avatar ? " new" : ""} profile picture, max 3 megabytes`;
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
        this.bannerInputText = `<i class='fas fa-image'></i> Choose a${this.data.banner ? " new" : ""} banner picture`;
        this.bannerInputText = null;
      } else if (!file.type.startsWith("image")) {
       this.bannerInputValue = null;
       this.bannerInputText = `<i class='fas fa-exclamation-triangle'></i> Choose a${this.data.banner ? " new" : ""} banner picture`;
       input.value = "";
      } else if (file.size > 5000000) {
        this.bannerInputText = `<i class='fas fa-exclamation-triangle'></i> Chose a${this.data.banner ? " new" : ""} banner picture, max 5 megabytes`;
        this.bannerInputValue = null;
      } else {
        this.bannerInputText = `<i class='fas fa-image'></i> ${file.name}`;
        this.bannerInputValue = file;
      }
      this.update();
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
    this.loadProfileData();
  }
}
</script>
