<template>
  <center>
    <div class="confirmation" ref="cookie">
      <div class="confirmation-text"><i class="fas fa-cookie-bite" style="margin-right: 0.5em; position: relative; font-size: 1.5em;"></i> We use cookies to provide our service — <a href="/legal" style="margin-left: 0.5em;">learn more..</a></div>
      <div class="confirmation-buttons">
        <a class="confirmation-primary confirmation-cookies" href="#" @click="confirmCookie()" style="width: 10em;"><i class="far fa-check-circle" style="font-size: 1.5em;"></i></a>
      </div>
    </div>
  </center>
</template>

<script>
export default {
  name: "Cookie",
  mounted () {
    const cookie = this.$refs.cookie;
    const hasAccepted = localStorage.getItem("cookies");

    if (hasAccepted) {
      cookie.style.display = "none";
    }
  },
  methods: {
    confirmCookie () {
      localStorage.setItem("cookies", "true");
      const cookie = this.$refs.cookie;
      cookie.style.display = "none";
    }
  },
}
</script>