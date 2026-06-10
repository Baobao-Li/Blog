<template>
  <div class="musicPlayer" v-if="show">
    <div class="con">
      <!-- 旋转封面 -->
      <div class="cover" style="transform: translateX(50%)">
        <img :src="audioSrc ? audioSrc : 'img/logo.jpg'" alt />
      </div>
      <!-- 操作栏 -->
      <div class="operation">
        <!-- 歌曲 - 歌手 名称 -->
        <div class="name">
          <div class="songName">
            <div style="white-space:nowrap;">歌曲名称：</div>
            <div
              style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 65px;"
            >{{song}}</div>
          </div>
          <div class="singerName">
            <div style="white-space:nowrap">歌手名称：</div>
            <div
              style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 65px;"
            >{{singer}}</div>
          </div>
        </div>

        <!-- 切换 -->
        <div class="switchover">
          <!-- 进度条 -->
          <div class="progress">
            <div></div>
          </div>
          <!-- 上一首 - 暂停 - 播放 -->
          <div class="control">
            <!-- 上一首 -->
            <i class="iconfont icon-shangyishou_huaban" @click="audioUp"></i>
            <!-- 暂停 -->
            <i
              class="iconfont"
              v-bind:class="[play ? 'icon-iconset0481' : 'icon-zanting1']"
              @click="playEvent"
            ></i>
            <!-- 下一首 -->
            <i class="iconfont icon-xiayishou_huaban" @click="audioDown"></i>
            <!-- 列表循环 - 单曲循环 - 随机播放 -->
            <i class="iconfont icon-A"></i>
          </div>
        </div>
      </div>
    </div>

    <audio autoplay :src="audioUrl" @ended="ended" ref="audio"></audio>
  </div>
</template>

<script>
import axios from "axios";

// 设为 true 并配置 API_BASE 后可恢复在线音乐
const ENABLE_MUSIC_API = false;
const API_BASE = "https://blogme.top:3000";
const request = axios.create({ timeout: 8000 });

export default {
  data() {
    return {
      audioSrc:
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2730414466,4018791223&fm=26&gp=0.jpg", // Mp3 封面
      audioUrl: "", // Mp3 Url
      audioData: [], // Mp3 数组
      singer: "", // 歌手名称
      song: "", // 歌曲名称
      audioId: 0, // 默认播放id
      play: true, // 播放 / 暂停
      dt: 0, // 歌曲时长
      show: false,
    };
  },
  mounted() {
    if (!ENABLE_MUSIC_API) return;

    this.show = !/Android|webOS|iPhone|iPod|BlackBerry/i.test(
      navigator.userAgent
    );
    if (this.show) {
      this.getHotMusic();
    }
  },
  methods: {
    // 获取热门歌曲
    getHotMusic() {
      if (!ENABLE_MUSIC_API) return;

      request
        .get(`${API_BASE}/top/list?idx=0`)
        .then((data) => {
          const tracks = data.data && data.data.playlist && data.data.playlist.tracks;
          if (tracks && tracks.length) {
            this.audioData = tracks;
            this.getMusicUrl();
          }
        })
        .catch(() => {});
    },
    // 获取歌曲Url
    getMusicUrl() {
      if (!ENABLE_MUSIC_API) return;

      const track = this.audioData[this.audioId];
      if (!track) return;

      request
        .get(`${API_BASE}/song/url?id=${track.id}`)
        .then((res) => {
          const songData = res.data && res.data.data && res.data.data[0];
          if (!songData) return;

          this.audioUrl = songData.url;
          this.audioSrc = track.al.picUrl;
          this.song = track.al.name;
          this.singer = track.ar[0].name;

          request
            .get(`${API_BASE}/song/detail?ids=${songData.id}`)
            .then((data) => {
              const song = data.data && data.data.songs && data.data.songs[0];
              if (song) {
                this.dt = song.dt;
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    // 上一首
    audioUp() {
      if (this.audioId === 0) {
        this.audioId = 0;
      } else {
        this.audioId = this.audioId - 1;
      }
      this.play = true;
      this.getMusicUrl();
    },
    // 下一首
    audioDown() {
      this.audioId = this.audioId + 1;
      if (this.audioId >= this.audioData.length) {
        this.audioId = 0;
      }
      this.play = true;
      this.getMusicUrl();
    },
    // 播放结束
    ended() {
      this.audioId = this.audioId + 1;
      if (this.audioId >= this.audioData.length) {
        this.audioId = 0;
      }
      this.getMusicUrl();
    },
    // 暂停 - 播放
    playEvent() {
      if (this.play) {
        // false 暂停
        this.play = false;
        this.$refs.audio.pause();
      } else {
        // true 播放
        this.play = true;
        this.$refs.audio.play();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// 播放主盒子
.con {
  width: 250px;
  height: 80px;
  position: fixed;
  top: 70px;
  // right: -165px;
  right: 5px;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 40px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  background: #ffffff;
  .iconfont {
    font-size: 16px;
  }
  // 旋转封面
  .cover {
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    border: 4px solid #000000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: rotate 10s linear infinite;
    transition-duration: 0.3s;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  // 操作栏
  .operation {
    padding-left: 5px;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    // 歌手名称 - 歌曲名称
    .name {
      display: flex;
      flex-direction: column;
      padding-right: 40px;
      font-size: 12px;
      // 歌曲名称
      .songName {
        flex: 1;
        display: flex;
        align-items: center;
        margin-top: 5px;
        color: #000000;
      }
      // 歌手名称
      .singerName {
        flex: 1;
        display: flex;
        align-items: center;
        margin-top: 5px;
        color: #000000;
      }
    }
    // 切换 - 进度条 - 上一首 - 暂停 - 下一首
    .switchover {
      padding-top: 5px;
      flex: 1;
      display: flex;
      flex-direction: column;
      // 进度条
      .progress {
        width: 90%;
        height: 5px;
        margin-left: 5%;
        background-color: #f5f5f5;
        div {
          background: rgb(62, 175, 124);
          height: 100%;
          width: 10px;
        }
      }
      // 上一首 - 暂停 - 下一首
      .control {
        flex: 1;
        display: flex;
        align-items: center;
        padding-right: 40px;
        i {
          flex: 1;
        }
      }
    }
  }
}
// 鼠标滑过播放主盒子
// .con:hover {
//   margin-right: 118px;
// }

// 旋转封面动画
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
.iconfont {
  color: rgb(62, 175, 124);
}
</style>