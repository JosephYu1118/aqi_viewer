<template lang="pug">
#home
  .aqi_viewer
    h2 空氣品質監測站
    SelectBox
    .background_box
      h4 關注測站點
      AqiBox(:p_aqi="favouriteAqi")
    AqiBox(:p_aqi="chosenAqi")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SelectBox from '@/components/SelectBox'
import AqiBox from '@/components/AqiBox'

export default {
  components: {
    SelectBox, AqiBox
  },
  methods: {
    ...mapActions(['loadAqiData'])
  },
  computed: {
    ...mapState(['aqiData', 'chosenAqi', 'favouriteAqi'])
  },
  created () {
    this.loadAqiData()
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#home
  +size(100%)
  +center_flex(flex-start)
  flex-direction: column
  .aqi_viewer
    width: 100%
    min-height: 100vh
    padding: 40px 0
    +center_flex(flex-start)
    flex-direction: column
    .background_box
      +size(90%, auto, 8px)
      padding: 40px 0
      background-color: rgba($c_white, 0.1)
      +center_flex
      flex-direction: column
</style>
