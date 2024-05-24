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
    defaultSrc:
      'data:image/png;base64,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',
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
