/* eslint-disable */
<template>
<div id="Api">
  <ul>
    <li v-for="item in assets">{{ item.name }}</li>
  </ul>
</div>
</template>

/* eslint-disable */
<script>
import axios from "axios";
export default {
  name: "Api",
  data() {
    return {
      assets: [],
      errors: []
    };
  },

  // Fetches posts when the component is created.
  async created() {
    try {
      const response = await axios.get(
        `https://ulnjbgo4dl.execute-api.eu-central-1.amazonaws.com/dev/hackaton/user/1/asset`
      );
      this.assets = response.data;
    } catch (e) {
      this.errors.push(e);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>