<template>
  <div class="container p-5">
    <div class="row shadow p-5">
      <div class="col-3" style="width: 18rem">
        <img class="site-image shadow" :src="site.image_url" /> <br />
        <div>
          <i class="fas fa-map-marker mt-5"></i> {{ site.location }},
          {{ site.states }}
        </div>
        <div><i class="fas fa-globe-europe mt-2"></i> {{ site.http_url }}</div>
        <div><i class="fas fa-th-large mt-2 m-b-5"></i> {{ site.category }}</div>
      </div>

      <div class="col-9">
        <h1>{{ site.site }}</h1>

        <p>
          {{ removePTags(site.short_description) }}
        </p>
        <button
          type="button"
          class="btn btn-primary shadow"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          More...
        </button>
      </div>
    </div>

    <div class="row">
      <div
        v-for="agent in site.agents"
        :key="agent._id"
        class="card p-2 m-5 shadow col-4"
        style="width: 18rem"
      >
        <div class="card-body">
          <h5 class="card-title">
            <i class="fas fa-user"></i> {{ agent.firstName }}
            {{ agent.lastName }}
          </h5>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ site.site }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" v-html="site.long_description"></div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary shadow"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { PORT } from "../commons";
export default {
  data() {
    return {
      site: {},
    };
  },
  methods: {
    init() {
      const { id } = this.$route.params;
      axios.get(`http://localhost:${PORT}/site/${id}`).then((res) => {
        this.site = res.data;
      });
    },
    removePTags(text) {
      return text.replace("<p>", "").replace("</p>", "");
    },
  },
  created() {
    this.init();
  },
  watch: {
    $route() {
      this.init();
    },
  },
};
</script>

<style scoped>
button{
  border-radius: 2px !important;
}
.site-image {
  width: auto;
  height: 100px;
}
</style>