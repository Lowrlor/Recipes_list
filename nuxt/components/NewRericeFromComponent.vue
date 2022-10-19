<template lang="pug">
.form(style='margin: auto; margin-top: 50px; text-align: center')
  v-card(width='300px')
    v-form(style='padding: 15px' v-if='!isEditing' @submit.prevent v-model="valid" lazy-validation ref="form")
      v-file-input(label="file" @change="handleFileChange($event)" :rules="[rules.required]" accept="image/png, image/jpeg, image/bmp"  style='margin-top: -10px' append-icon='mdi-camera' prepend-icon='')
      v-text-field(label="type" :rules="[rules.required]" v-model='recipe.type')
      v-text-field(label="title" :rules="[rules.required]" v-model='recipe.title')
      v-text-field(label="time" :rules="[rules.required]" v-model='recipe.time')
      v-combobox(label="products" append-icon='' :rules="[rules.required, rules.counter]" v-model='recipe.products' multiple chips)
      v-textarea(filled label="description" v-model='recipe.description')
      v-btn(depressed type='submit' :disabled="!valid" @click="validate" color="primary") Create
    v-form(style='padding: 15px' v-else @submit.prevent v-model="valid" lazy-validation ref="form")
      v-file-input(label="file" @change="handleFileChange($event)" :rules="[rules.required]" accept="image/png, image/jpeg, image/bmp"  style='margin-top: -10px' append-icon='mdi-camera' prepend-icon='')
      v-text-field(label="type" :rules="[rules.required]" v-model='updateRecipe.type')
      v-text-field(label="title" :rules="[rules.required]" v-model='updateRecipe.title')
      v-text-field(label="time" :rules="[rules.required]" v-model='updateRecipe.time')
      v-combobox(label="products" append-icon='' :rules="[rules.required, rules.counter]" v-model='updateRecipe.products' multiple chips)
      v-textarea(filled label="description" v-model='updateRecipe.description')
      v-btn(@click="$emit('toggle')") Cancel
      v-btn(@click='saveUpdate(updateRecipe)') Save
</template>
<script>
export default {
  component: true,
  props: {
    isEditing: Boolean,
    updateRecipe: Object
  },
  data () {
    return {
      recipe: {
        img: '',
        type: '',
        title: '',
        time: '',
        description: '',
        products: []
      },
      rules: {
        required: value => !!value || 'Required',
        counter: value => value.length >= 1 || 'Required'
      },
      valid: true
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        this.create()
      }
    },
    create () {
      const data = new FormData()
      data.append('img', this.recipe.img)
      data.append('type', this.recipe.type)
      data.append('title', this.recipe.title)
      data.append('time', this.recipe.time)
      data.append('products', this.recipe.products)
      data.append('description', this.recipe.description)
      console.log(this.recipe.products)
      this.$axios.post('/', data)
        .then((res) => {
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    saveUpdate (recipe) {
      const data = new FormData()
      data.append('img', this.recipe.img)
      data.append('type', recipe.type)
      data.append('title', recipe.title)
      data.append('time', recipe.time)
      data.append('products', recipe.products)
      data.append('description', recipe.description)
      this.$axios.put('/update/' + recipe._id, data)
        .then((doc) => {
          this.$emit('dci', doc.data.img)
          this.$emit('toggle')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleFileChange (evt) {
      this.recipe.img = evt
    }
  }
}
</script>
