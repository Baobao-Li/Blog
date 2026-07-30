<template>
  <div id="clock">
    <span class="date">{{year}}-{{month}}-{{date}} {{day}}</span>
    <span class="time">{{hour}}:{{minute}}:{{second}}</span>
  </div>
</template>

<script>
import { clockParts } from "../utils/date";

export default {
  data() {
    return {
      ...clockParts(),
      timer: null,
    };
  },
  created() {
    this.timer = setInterval(this.getDate, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getDate() {
      Object.assign(this, clockParts());
    },
  },
};
</script>

<style lang="css" scoped>
#clock {
  font-family: "Share Tech Mono", monospace;
  text-align: center;
  color: #daf6ff;
  text-shadow: 0 0 2px #0aafe6, 0 0 2px rgba(10, 175, 230, 0);
}
#clock .time {
  letter-spacing: 0.05em;
  font-size: 50px;
  padding: 5px 0;
}
#clock .date {
  letter-spacing: 0.1em;
  font-size: 24px;
}
</style>