<template>
  <div class="musicPlayer" v-if="show">
    <div class="con" :title="errorMessage">
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

    <audio autoplay :src="audioUrl" @ended="ended" @error="onAudioError" ref="audio"></audio>
  </div>
</template>

<script>
// 设为 true 并配置 API_BASE 后可恢复在线音乐
const ENABLE_MUSIC_API = false;
const API_BASE = "https://blogme.top:3000";

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
      request: null,
      errorMessage: "", // 最近一次失败的原因
    };
  },
  mounted() {
    if (!ENABLE_MUSIC_API) return;

    this.show = !/Android|webOS|iPhone|iPod|BlackBerry/i.test(
      navigator.userAgent
    );
    if (this.show) {
      this.initMusic().catch((error) => {
        this.reportError("音乐播放器初始化失败", error);
      });
    }
  },
  methods: {
    // 统一记录失败原因，避免错误被静默丢弃
    reportError(context, error) {
      this.errorMessage = context;
      console.error(`[musicPlayer] ${context}`, error);
    },
    async initMusic() {
      try {
        const axios = (await import("axios")).default;
        this.request = axios.create({ timeout: 8000 });
      } catch (error) {
        this.reportError("音乐播放器依赖加载失败", error);
        this.show = false;
        return;
      }
      await this.getHotMusic();
    },
    // 获取热门歌曲
    async getHotMusic() {
      if (!ENABLE_MUSIC_API || !this.request) return;

      let response;
      try {
        response = await this.request.get(`${API_BASE}/top/list?idx=0`);
      } catch (error) {
        this.reportError("热门歌曲列表获取失败", error);
        return;
      }

      const tracks =
        response.data && response.data.playlist && response.data.playlist.tracks;
      if (!tracks || !tracks.length) {
        this.reportError("热门歌曲列表为空", response.data);
        return;
      }

      this.audioData = tracks;
      await this.getMusicUrl();
    },
    // 获取歌曲Url
    async getMusicUrl() {
      if (!ENABLE_MUSIC_API || !this.request) return;

      const track = this.audioData[this.audioId];
      if (!track) {
        this.reportError(`歌曲不存在: index ${this.audioId}`, null);
        return;
      }

      let response;
      try {
        response = await this.request.get(`${API_BASE}/song/url?id=${track.id}`);
      } catch (error) {
        this.reportError(`歌曲地址获取失败: ${track.id}`, error);
        return;
      }

      const songData =
        response.data && response.data.data && response.data.data[0];
      if (!songData || !songData.url) {
        this.reportError(`歌曲地址为空: ${track.id}`, response.data);
        return;
      }

      this.errorMessage = "";
      this.audioUrl = songData.url;
      this.audioSrc = (track.al && track.al.picUrl) || this.audioSrc;
      this.song = (track.al && track.al.name) || "";
      this.singer = (track.ar && track.ar[0] && track.ar[0].name) || "";

      await this.getMusicDetail(songData.id);
    },
    // 获取歌曲详情（时长），非关键信息
    async getMusicDetail(id) {
      try {
        const response = await this.request.get(
          `${API_BASE}/song/detail?ids=${id}`
        );
        const song =
          response.data && response.data.songs && response.data.songs[0];
        if (song) {
          this.dt = song.dt;
        }
      } catch (error) {
        console.warn(`[musicPlayer] 歌曲详情获取失败: ${id}`, error);
      }
    },
    // 上一首
    audioUp() {
      if (this.audioId === 0) {
        this.audioId = 0;
      } else {
        this.audioId = this.audioId - 1;
      }
      this.play = true;
      this.switchTrack();
    },
    // 下一首
    audioDown() {
      this.audioId = this.audioId + 1;
      if (this.audioId >= this.audioData.length) {
        this.audioId = 0;
      }
      this.play = true;
      this.switchTrack();
    },
    // 播放结束
    ended() {
      this.audioId = this.audioId + 1;
      if (this.audioId >= this.audioData.length) {
        this.audioId = 0;
      }
      this.switchTrack();
    },
    // 音频加载/解码失败
    onAudioError(event) {
      this.play = false;
      this.reportError(
        `音频加载失败: ${this.song || this.audioUrl}`,
        event.target && event.target.error
      );
    },
    switchTrack() {
      this.getMusicUrl().catch((error) => {
        this.reportError("切换歌曲失败", error);
      });
    },
    // 暂停 - 播放
    playEvent() {
      const audio = this.$refs.audio;
      if (!audio) {
        this.reportError("播放器未就绪", null);
        return;
      }
      if (this.play) {
        // false 暂停
        this.play = false;
        audio.pause();
        return;
      }
      // true 播放
      this.play = true;
      const played = audio.play();
      // 浏览器自动播放策略会让 play() 返回被拒绝的 Promise
      if (played && typeof played.catch === "function") {
        played.catch((error) => {
          this.play = false;
          this.reportError("播放失败，请重试", error);
        });
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