<template>
  <div class="home">
    <Header title="Home" />

    <div class="home-center">
      <!-- -->
    </div>
    <Cookie />
    <!-- <Footer /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Cookie from "@/components/Cookie.vue";

export default {
  name: "Home",
  components: {
    Header,
    Cookie
  },
  data () {
    return {
      nothing: true
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
