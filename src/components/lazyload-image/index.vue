<script lang="ts" setup>
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'LazyloadImage',
})

withDefaults(
  defineProps<{
    src: string
    alt?: string
    defaultSrc?: string
  }>(),
  {
    alt: 'img',
    // 默认 base64 链接图片
    defaultSrc: '/assets/default-link.png',
  },
)

const lazyImageRef = ref()

const io = new IntersectionObserver((entries) => {
  const { target, isIntersecting } = entries[0]

  if (isIntersecting) {
    ;(target as HTMLImageElement).src
      = target.getAttribute('data-img-src') || ''
    io.unobserve(target)
    io.disconnect()
  }
})

onMounted(() => {
  io.observe(lazyImageRef.value)
})
</script>

<template>
  <img
    ref="lazyImageRef"
    class="lazy-img"
    :src="defaultSrc"
    :alt="alt"
    :data-img-src="src || defaultSrc"
  >
</template>

<style>
.lazy-img {
  aspect-ratio: 1/1;
}
</style>
