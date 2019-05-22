<template lang="pug">
#aqi_box
  .aqi_card(v-for="aqi in p_aqi"
            @click.self="turnOver($event)"
            :key="aqi.favouriteIndex")
    .face.back(:class="getBackground(aqi.AQI)")
      table.table.table-striped
        tbody
          tr(v-for="(value, key) in getDetail(aqi)")
            th(scope="row") {{ key }}
            td {{ value }}
    .face.front(:class="getBackground(aqi.AQI)")
      label
        input.btn_favourite(type="checkbox"
                            v-model="aqi.isFavourite"
                            @click="setFavouriteAqi(aqi)")
        i.fas.fa-star(:class="{ 'added': aqi.isFavourite }")
      .aqi_title {{ aqi.County }} {{ aqi.SiteName }}
      .aqi_tag AQI
      .aqi_value(:style="{ 'color': getColor(aqi.AQI) }") {{ aqi.AQI }}
      .aqi_description {{ aqi.Status }}
      .aqi_time {{ aqi.PublishTime }}
      svg(viewBox="-10 -10 220 220")
        circle.base(cx="100"
                    cy="100"
                    r="100")
        circle.progress(cx="100"
                        cy="100"
                        r="100"
                        :style="{ 'stroke-dashoffset': getValue(aqi.AQI), 'stroke': getColor(aqi.AQI) }")
</template>

<script>
export default {
  props: [
    'p_aqi'
  ],
  data () {
    return {}
  },
  methods: {
    getBackground (aqi) {
      return {
        'status_aqi_01': aqi >= 0 && aqi <= 50,
        'status_aqi_02': aqi >= 51 && aqi <= 100,
        'status_aqi_03': aqi >= 101 && aqi <= 150,
        'status_aqi_04': aqi >= 151 && aqi <= 200,
        'status_aqi_05': aqi >= 201 && aqi <= 300,
        'status_aqi_06': aqi >= 301 && aqi <= 500
      }
    },
    getValue (aqi) {
      let r = 100
      let c = Math.PI * (r * 2)
      return (Math.abs(r - aqi) / r) * c
    },
    getColor (aqi) {
      return (aqi >= 0 && aqi <= 200) ? '#1f3c88' : '#ffb228'
    },
    getDetail (aqi) {
      return {
        'PM2.5 移動平均': aqi['PM2.5_AVG'],
        'PM2.5 小時濃度': aqi['PM2.5'],
        'PM10 移動平均': aqi['PM10_AVG'],
        'PM10 小時濃度': aqi['PM10']
      }
    },
    turnOver (event) {
      $(event.target).css({
        transform: 'rotateY(180deg)'
      })
      setTimeout(() => {
        $(event.target).css({
          transform: 'rotateY(0deg)'
        })
      }, 1500)
    },
    setFavouriteAqi (aqi) {
      aqi.isFavourite = !aqi.isFavourite
      this.$store.commit('getFavouriteAqi', aqi)
    }
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#aqi_box
  +size(100%, auto)
  padding: 30px 0
  +center_flex(center, flex-start)
  flex-wrap: wrap
  .aqi_card
    +size(180px, 240px, 8px)
    margin: 10px
    padding: 15px
    transform-style: preserve-3d
    backface-visibility: hidden
    box-shadow: 5px 10px 10px rgba(black, 0.1)
    cursor: pointer
    transition: all 0.3s, transform 0.7s
    &:hover
      transform: translate(-2px, -2px)
      box-shadow: 5px 10px 20px rgba(black, 0.5)
    .face
      +size(180px, 240px, 8px)
      +center_position
      backface-visibility: hidden
      pointer-events: none
      &.back
        transform: translate(-50%, -50%) rotateY(180deg)
        table
          +center_position
          +center_flex
          tbody
            tr
              +center_flex(space-evenly)
              th
                width: 100%
                border: 0
                font-size: 10px
              td
                border: 0
                font-size: 10px
                font-weight: 300
      &.front
        label
          position: absolute
          top: 5%
          right: 5%
          pointer-events: auto
          cursor: pointer
          .btn_favourite
            display: none
          i
            color: white
            transition: 0.3s
            &:hover
              color: rgba($c_blue, 0.5)
            &.added
              color: $c_blue
              &:hover
                color: $c_blue
        [class ^= 'aqi_']
          width: 100%
          font-size: 12px
          font-weight: 300
          text-align: center
          +center_position
        .aqi_title
          font-size: 18px
          font-weight: 700
          top: 20%
        .aqi_tag
          top: 45%
        .aqi_value
          font-size: 25px
          font-weight: 700
          top: 57%
        .aqi_description
          width: 70px
          line-height: 120%
          top: 69%
        .aqi_time
          top: 90%
        svg
          +size(120px)
          +center_position
          top: 57%
          transform: translate(-50%, -50%) rotate(-90deg)
          circle
            stroke-width: 15
            fill: transparent
            stroke: $c_black
            stroke-dasharray: 628
            &.base
              opacity: 0.2

.status_aqi_01
  background-color: $c_green
  color: $c_black
.status_aqi_02
  background-color: $c_yellow
  color: $c_black
.status_aqi_03
  background-color: $c_orange
  color: $c_black
.status_aqi_04
  background-color: $c_red
  color: $c_white
.status_aqi_05
  background-color: $c_purple
  color: $c_white
.status_aqi_06
  background-color: $c_burgundy
  color: $c_white
</style>
