<script setup lang="ts">
// import { withBase } from 'vitepress'
</script>

<template>
  <div class="logo">
    <img src="/logo.png" width="197" height="80" alt="website-nav-logo" />
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
