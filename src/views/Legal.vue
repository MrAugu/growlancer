<template>
  <div class="legal">
    <Header title="Legal"/>
    <div style="margin: 2.5em;">
      <h1 id="#privacy-policy">Privacy Policy</h1>
      <p>Coming SoonTM</p>
    </div>
    <Cookie />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Cookie from "@/components/Cookie.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Legal",
  components: {
    Header,
    Cookie,
    Footer
  }
}
</script>
