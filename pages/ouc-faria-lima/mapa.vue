<template>
  <div>
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      style="height: 400px"
    >
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation" />

      <vl-geoloc @update:position="geolocPosition = $event">
        <template slot-scope="geoloc">
          <vl-feature id="position-feature" v-if="geoloc.position">
            <vl-geom-point :coordinates="geoloc.position" />
            <vl-style-box>
              <vl-style-icon :scale="0.4" :anchor="[0.5, 1]" src="_media/marker.png" />
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc>

      <vl-layer-tile>
        <vl-source-stamen layer="toner-lite" />
      </vl-layer-tile>
    </vl-map>
    <div style="padding: 20px">
      Zoom: {{ zoom }}<br>
      Center: {{ center }}<br>
      Rotation: {{ rotation }}<br>
      My geolocation: {{ geolocPosition }}
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Map, TileLayer, OsmSource, Geoloc } from 'vuelayers'
import 'vuelayers/lib/style.css'

Vue.use(Map)
Vue.use(TileLayer)
Vue.use(OsmSource)
Vue.use(Geoloc)

export default {
  data () {
    return {
      zoom: 2,
      center: [0, 0],
      rotation: 0,
      geolocPosition: undefined
    }
  }
}
</script>
