<template>
  <div class="map-container" id="container">
    <div class="spinner-border" role="status" v-if="!loaded">
      <span class="sr-only">Loading...</span>
    </div>

    <div id="mapContainer" class="map"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import * as L from "leaflet";
import "leaflet-defaulticon-compatibility";

export default {
  name: "Map",
  props: {
    sites: {
      type: Array,
    },
  },
  data() {
    return {
      loaded: true,
    };
  },
  methods: {
    async init() {
      this.loaded = false;
      const { sites } = this;
      if (this.map) this.map.remove();

      const mymap = L.map("mapContainer").setView([51.505, -0.09], 13);
      this.map = mymap;
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1IjoiZGFuaWxvMTIxNCIsImEiOiJja2lqN3Z6djAwMDU2MnRtamZxZHg0eDJhIn0.qMiqt7L6kKWyJFOiTZz5MA",
        }
      ).addTo(mymap);

      for (const site of sites) {
        const marker = L.marker([site.latitude, site.longitude], {
          title: site.name,
        }).addTo(mymap);
        const short = site.short_description.replace("<p>", "").replace("</p>", "");
        console.log("ej brat site sum");
        await marker
          .bindPopup(
            `<div class="card">
              <img class="card-img-top" src="${site.image_url}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${site.site}</h5>
              <p class="card-text"><i class="fas fa-map-marker"></i> ${site.location}</p>
              <p class="card-text text-truncate">${short}</p>

              <a class="card-link" href="#/site/${site._id}">Open</a>
          </div>
            </div>`
          )
          .openPopup();
      }
      this.loaded = true;
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    sites() {
      this.init();
    },
  },
};
</script>

<style>

.card-img-top{
  width:100px;
  height: 100px;
  margin:auto
}
.card {
  height: 400;
}
.map-container,
#mapContainer {
  width: 80vw;
  height: 90vh;
  margin: auto;
}
</style>