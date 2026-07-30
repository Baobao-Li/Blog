function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
if (typeof jQuery === "undefined") {
  console.error("[MouseClickEffect] jQuery 未加载，点击特效已禁用");
} else if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  jQuery(document).ready(function ($) {
    $("body").click(function (e) {
      var a = new Array("css", "scss", "node-sass", "sass-loader", "moment", "TypeScript", "HTML", "uni-app", "Ant Design Mobile", "js", "Vue", "vuepress", "React", "jquery", "Swiper", "Vant", "Element-ui", "react-router-dom", "redux", "axios", "mockjs", "react-redux ", "Vuex");
      var $i = $("<span/>").text(a[Math.floor(Math.random() * a.length)]);
      var x = e.pageX,
        y = e.pageY;
      $i.css({
        "z-index": new Date() * 1,
        "top": y - 20,
        "left": x,
        "position": "absolute",
        "font-weight": "bold",
        "color": `rgb(${getRandom(255, 0)},${getRandom(255, 0)},${getRandom(255, 0)})`,
        "user-select": 'none',
        "cursor": 'default',
        "white-space": 'nowrap'
      });
      $("body").append($i);
      $i.animate({
        "top": y - 180,
        "opacity": 0
      },
        1500,
        function () {
          $i.remove();
        });
    });
  });
}