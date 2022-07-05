<script lang="ts" setup>
import GithubCorner from '@/components/github-corner/index.vue'
import { menus } from '@/data'
</script>

<template>
  <router-view :menus="menus"></router-view>
  <GithubCorner />
</template>
