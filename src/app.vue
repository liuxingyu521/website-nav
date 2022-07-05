<script lang="ts" setup>
import GithubCorner from '@/components/github-corner/index.vue'
import Layout from '@/layout/webstack/index.vue'
import { menus } from '@/data'
</script>

<template>
  <Layout :menus="menus" />
  <GithubCorner />
</template>
