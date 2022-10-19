<template lang="pug">
v-app()
  .header
    HeaderComponent
  Nuxt
</template>

<script>
export default {
  component: true,
  name: 'DefaultLayout',
  data () {
    return {
    }
  }
}
</script>
