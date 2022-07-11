<script lang="ts" setup>
import { onMounted, ref } from 'vue'

withDefaults(
  defineProps<{
    src: string
    alt?: string
    defaultSrc?: string
  }>(),
  {
    alt: 'img',
    // 默认灰色背景
    defaultSrc:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWAQMAAAAGz+OhAAAAA1BMVEXu7u6DSdFtAAAAGklEQVRIx+3BMQEAAADCIPuntsYOYAAAQN4BC7gAAY4I5JIAAAAASUVORK5CYII=',
  }
)

const lazyImageRef = ref()

const io = new IntersectionObserver((entries) => {
  const { target, isIntersecting } = entries[0]

  if (isIntersecting) {
    ;(target as HTMLImageElement).src =
      target.getAttribute('data-img-src') || ''
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
    :data-img-src="src"
  />
</template>

<style>
.lazy-img {
  aspect-ratio: 1/1;
}
</style>
