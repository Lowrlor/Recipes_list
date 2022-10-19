<template lang="pug">
.list
  v-container(fluid)
    v-row(justify="end" style='padding: 15px')
      v-btn(v-if='editable' @click='removeAll' color='red') RemoveAll
    v-col(cols="12" align-center )
      v-row(justify="center" no-gutters)
        p(v-if='items.length <= 0' style='margin-top: 125px; font-size: 56px; color: black; opacity: 0.3') Empty
        v-card(width="300px" v-else class="ma-3 pa-6" outlined tile v-for='item, index in items' :key='item._id' style='margin-left: 15px')
          template(v-if='!edit.isEditing || edit.index != index')
            v-img(:src="'http://localhost:3001/images/' + item.img" height="200px")
            v-list()
              v-list-item
                v-list-item-content
                  v-list-item-title {{ item.type }}
                  v-list-item-subtitle Type
              v-list-item
                v-list-item-content
                  v-list-item-title {{ item.title }}
                  v-list-item-subtitle title
              v-list-item
                v-list-item-content
                  v-list-item-title {{ item.time }}
                  v-list-item-subtitle time
              v-list-item(height='100%')
                v-list-item-content
                  v-list(v-for='product, index in item.products' :key='product.index')
                    v-list-item-title {{ product }}
                  v-list-item-subtitle products
              v-list-item
                v-list-item-content() {{ item.description }}
                  v-list-item-subtitle description
          template(v-else)
            NewRericeFromComponent(:isEditing='edit.isEditing' :updateRecipe='item' @toggle="edit.isEditing = !edit.isEditing" @dci='dci')
          v-list-item(v-if='editable && !edit.isEditing')
            p {{ data }}
            v-btn(@click='update(index)') Edit
            v-btn(@click='remove(item._id, index)') Remove
</template>

<script>
export default {
  component: true,
  asyncData () {
    return {
      rendering: process.server ? 'server' : 'client'
    }
  },
  data () {
    return {
      items: [],
      edit: {
        isEditing: false,
        index: null
      },
      data: ''
    }
  },
  created () {
    this.$axios.get('/')
      .then((doc) => {
        this.items = doc.data
        console.log(doc.data[0].products)
      })
  },
  computed: {
    editable () {
      if (this.$route.name === 'edit') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    update (index) {
      if (this.edit.isEditing) {
        this.edit.isEditing = false
        this.edit.index = null
      } else {
        this.edit.isEditing = true
        this.edit.index = index
      }
    },
    remove (_id, index) {
      this.$axios.delete('/removeOne/' + _id)
        .then((doc) => {
          this.items.splice(index, 1)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    removeAll () {
      this.$axios.delete('/removeAll/')
        .then((doc) => {
          this.items = []
        })
        .catch((err) => {
          console.log(err)
        })
    },
    dci (img) {
      this.items[this.edit.index].img = img
    }
  }
}
</script>

<style lang='sass'>
.m-b-1
  margin-bottom: 15px
</style>
