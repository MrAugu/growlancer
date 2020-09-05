<template>
  <section>
    <Header v-bind:title="username" />
    <div class="page-loader" v-if="!loaded"><div class="page-pulse"><div></div><div></div><div></div></div></div>
    <h1 class="head-title-underline" v-if="loaded"><i class="fas fa-info-circle icon"></i> My Account</h1>
    <form class="form" v-if="loaded">
      <div class="form-field">
        <p class="form-field-title">Bio</p>
        <p class="form-field-title-description">A text of maxim 100 characters birefly describing you.</p>
        <textarea class="form-field-textarea" @input="update()" v-model="bio" placeholder="I'm a mysterious person."></textarea>
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
      saving: false
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
      if (this.bio !== this.data.bio) {
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
      this.changed = false;
    }
  },
  mounted () {
    this.loadProfileData();
  }
}
</script>
