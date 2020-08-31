<template>
  <footer style="text-align: center;" v-if="!shown">
    <p>ModCord by MrAugu &copy; 2020 All Rights Reserved</p>
    <a href="/legal">Terms of Service & Privacy Policy</a><br>
    <a href="/support">ModCord Discord Server</a>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: ["shown"]
}
</script>

<style scoped>
  footer {
    background-color: rgba(0, 0, 0, 0.2);
    width: 100%;
    margin-top: 2em;
    padding: 1em;
    min-height: 4em;
    font-size: 0.9em;
  }

  footer p {
    color: #B9BBBE;
  }
</style>