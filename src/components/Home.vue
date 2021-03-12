<template>
  <div class="container mt-5 text-center">
    <div class="shadow p-5">
      <h1>Unesco Sites</h1>
    <br />

    <p>
      Unesco sites is a tool that finds the Unesco heritage sites nearest to
      your address, and displays information about them. We have a collection of
      over 1000 unique sites with photos, geographical and historical
      information. You can also see our agents that are assigned to these
      locations
    </p>

    <div class="input-group mb-3 p-3">
      <input
        v-model="address"
        type="text"
        class="form-control shadow"
        placeholder="Your address"
        aria-label="Your address"
        aria-describedby="button-addon2"
      />
      <button class="btn btn-primary shadow" type="button" id="button-addon2" @click="loadLocation">
        Search
      </button>
    </div>
    </div>


    

    <div class="spinner-border" role="status" v-if="!loaded">
      <span class="sr-only">Loading...</span>
    </div>
    <Map :sites="sites" class="mt-5">

    </Map>
    
  </div>
</template>

<script>
import axios from "axios";
import { API_KEY, PORT } from "../commons.js";
import Map from './Map.vue';
export default {
  components: {Map},
  data() {
    return {
      address: "",
      location: {},
      sites: [], 
      loaded: true
    };
  },
  methods: {
    loadLocation() {
      const { address } = this;
      axios
        .get(
          `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&format=json&q=${address.replace(
            " ",
            "%20"
          )}`
        )
        .then((res) => {
          this.location = res.data[0];
          this.loaded = false;
          this.loadSites();
        });
    },
    loadSites(){
      const {location} = this;
      const longitude = location.lon;
      const latitude = location.lat;
      axios
        .get(
          `http://localhost:${PORT}/sites?longitude=${longitude}&latitude=${latitude}`).then(res=>{
            this.sites = res.data;
            this.loaded = true;
          });
      
    }
  },
};
</script>

<style>
</style>