<template>
  <center>
    <div class="confirmation">
      <div class="confirmation-text">Careful — you have unsaved changes!</div>
      <div class="confirmation-buttons">
      <a class="confirmation-discard" href="javascript:void(0)" @click="$emit('discard')">Discard Changes</a>
      <a class="confirmation-primary" href="javascript:void(0)" @click="$emit('save')" v-if="!loading">Save Changes</a>
      <a class="confirmation-primary" v-if="loading"><div class="ball-pulse"><div></div><div></div><div></div></div></a>
      </div>
    </div>
  </center>
</template>

<script>
export default {
  name: "Confirm",
  props: ["loading"]
}
</script>