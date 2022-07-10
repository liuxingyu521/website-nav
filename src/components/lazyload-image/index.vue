<script lang="ts" setup>
import { onMounted, ref } from 'vue'

withDefaults(
  defineProps<{
    src: string
    alt?: string
  }>(),
  {
    alt: 'img',
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
  <img ref="lazyImageRef" src="" :alt="alt" :data-img-src="src" />
</template>
