<template>
  <section>
    <Header v-bind:title="title" />
    <div class="home-center">
      <h1 class="error-title">{{ code }}</h1>
      <h3 class="error-message">{{ message }}</h3>
    </div>
    <Cookie />
    <Footer v-bind:shown="true" />
  </section>
</template>

<script>
import Header from "@/components/Header.vue";
import Cookie from "@/components/Cookie.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Error",
  components: {
    Header,
    Cookie,
    Footer
  },
  data () {
    return {
      code: null,
      message: null,
      title: null
    }
  },
  methods: {
    init: function () {
      const parameters = new URLSearchParams(window.location.search.substring(1));
      
      this.code = parameters.get("code") || "404";
      this.message = parameters.get("message") || "Page you're looking for was not found.";
      this.title = parameters.get("title") || "Not Found"
    }
  },
  mounted () {
    this.init();
  }
}
</script>

<style scoped>
  .error-title {
    font-size: 12em;
  }

  .error-message {
    font-size: 1.7em;
    margin-top: 0.5em;
  }
</style>
