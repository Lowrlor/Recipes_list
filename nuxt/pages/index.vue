<template lang="pug">
.main
  .body
    ListComponent
      v-list-tile
</template>
<script>
export default {
  component: true,
  asyncData () {
    return {
      rendering: process.server ? 'server' : 'client'
    }
  }
}
</script>
