<template>
  <div class="container mt-5 text-center">
    <h1>Unesco Sites</h1>
    <br />

    <p>
      Unesco sites is a tool that finds the Unesco heritage sites nearest to
      your address, and displays information about them. We have a collection of
      over 1000 unique sites with photos, geographical and historical
      information. You can also see our agents that are assigned to these
      locations
    </p>


    {{location}}
    <div class="input-group mb-3 p-3">
      <input
        v-model="address"
        type="text"
        class="form-control"
        placeholder="Your address"
        aria-label="Your address"
        aria-describedby="button-addon2"
      />
      <button class="btn btn-primary" type="button" id="button-addon2" @click="loadLocation">
        Search
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_KEY } from "../commons.js";
export default {
  data() {
    return {
      address: "",
      location
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
        });
    },
  },
};
</script>

<style>
</style>