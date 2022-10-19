<template lang="pug">
v-app-bar
  v-toolbar-title
    a(href='/' style='color: black') Recipes
  a(href='/newrecipes' style='margin-left: 15px') Add new recipes
  a(href='/edit' style='margin-left: 15px') Edit recipes
</template>
<script>
export default {
  component: true
}
</script>
