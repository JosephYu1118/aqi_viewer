<template lang="pug">
#select_box
  select.form-control(name="option"
                      v-model="chosenCounty")
    option(value=""
            selected
            disabled) --- 請選擇縣市 ---
    option(v-for="county in getCounty"
            :value="county") {{ county }}
  select.form-control(name="option"
                      v-model="chosenSite")
    option(value=""
            selected
            disabled
            v-if="!chosenSite") --- 請選擇測站 ---
    option(v-for="site in getSite"
            :value="site"
            v-if="chosenCounty") {{ site }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      chosenCounty: '',
      chosenSite: ''
    }
  },
  methods: {
    setChosenAqi (county, site) {
      this.$store.commit('getChosenAqi', { county, site })
    }
  },
  computed: {
    ...mapState(['aqiData']),
    getCounty () {
      let tempCounty = this.aqiData.map(element => element.County)
      return tempCounty.filter((element, index, array) => {
        return array.indexOf(element) === index
      })
    },
    getSite () {
      let tempSite = this.aqiData.filter(element => {
        return element.County === this.chosenCounty
      })
      return tempSite.map(element => element.SiteName)
    }
  },
  watch: {
    chosenCounty () {
      this.chosenSite = ''
      this.setChosenAqi(this.chosenCounty)
    },
    chosenSite () {
      this.setChosenAqi(this.chosenCounty, this.chosenSite)
    }
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#select_box
  padding: 30px 0
  +center_flex
  select
    width: 180px
    margin: 0 10px
    appearance: none
    background-image: url("https://img.icons8.com/ultraviolet/40/000000/sort-down.png")
    background-repeat: no-repeat
    background-position: 95% center
    background-size: 15px
</style>
