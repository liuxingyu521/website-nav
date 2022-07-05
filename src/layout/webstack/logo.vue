<script setup lang="ts">
// import { withBase } from 'vitepress'
</script>

<template>
  <div class="logo">
    <!-- <div class="logo--main">
      <i class="icon-lianjie" style="margin-right: 8px;"></i>
      Website Nav
    </div>
    <div class="logo--desc">实用网址导航</div> -->
    <a>
      <img src="/logo.png" />
    </a>
  </div>
</template>

<style lang="less">
.logo {
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &--main {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    background: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-family: 'dd';
  }

  &--desc {
    padding-top: 8px;
    background: linear-gradient(90deg, #66a6ff 0%, #89f7fe 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-style: italic;
    font-weight: 500;
    letter-spacing: 10px;
    font-size: 1.1rem;
  }
}
</style>
