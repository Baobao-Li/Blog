<template>
  <div id="clock">
    <span class="date">{{year}}-{{month}}-{{date}} {{day}}</span>
    <span class="time">{{hour}}:{{minute}}:{{second}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: "", // 年
      month: "", // 月
      date: "", // 日
      hour: "", // 时
      minute: "", // 分
      second: "", // 秒
      day: "", // 星期
      week: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], // 星期
      timer: null,
    };
  },
  created() {
    this.getDate();
    this.timer = setInterval(() => {
      this.getDate();
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    getDate() {
      let time = new Date();
      this.year = time.getFullYear(); // 年
      this.month =
        time.getMonth() + 1 >= 10
          ? time.getMonth() + 1
          : "0" + (time.getMonth() + 1); // 月
      this.date = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate(); // 日
      this.hour =
        time.getHours() >= 10 ? time.getHours() : "0" + time.getHours(); // 时
      this.minute =
        time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes(); // 分
      this.second =
        time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds(); // 秒
      this.day = this.week[time.getDay()];
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