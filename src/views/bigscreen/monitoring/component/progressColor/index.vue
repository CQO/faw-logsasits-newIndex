<template>
<!-- 自定义svg , 在需要更改的地方使用即可 (目前作用于 设置 elementui 环形进度条的渐变色)  -->
  <svg width="100%" height="100%">
<!-- 渐变颜色一 通过id获取  -->
    <defs>
      <linearGradient id="blue" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color: rgb(31, 197, 255); stop-opacity: 1;" />
        <stop offset="100%" style="stop-color: rgb(35, 231, 169); stop-opacity: 1;" />
      </linearGradient>
    </defs>
<!--  渐变颜色二 通过id获取 -->
    <defs>
      <linearGradient id="dismantle" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color: #ef07f7; stop-opacity: 1;" />
        <stop offset="100%" style="stop-color: #945fff; stop-opacity: 1;" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script>
export default {
  name: 'progressColor'
};
</script>