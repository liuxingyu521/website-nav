<script lang="ts" setup>
import LazyloadImage from '@/components/lazyload-image/index.vue'

defineProps({
  section: {
    type: Object,
    default: () => ({}),
  },
})

</script>

<template>
  <div :class="['nav-section', {'nav-section--top': section.top}]">
    <h4
      :id="section.title.replace(/\s/, '_')"
      class="nav-section__title"
    >
      <i class="i-fa-tags" />
      {{ section.title }}
    </h4>
    <div class="nav-section__content">
      <div
        v-for="link in section.links"
        :key="link.url"
        class="nav-section__item"
      >
        <a
          :href="link.url"
          target="_blank"
        >
          <div class="nav-section__item__left">
            <client-only>
              <LazyloadImage
                :src="
                  link.logo
                    ? `/assets/${link.logo}`
                    : ''
                "
                :alt="link.title"
              />
            </client-only>
          </div>
          <div class="nav-section__item__right">
            <h3 class="nav-section__item__right__title">{{ link.title }}</h3>
            <p class="nav-section__item__right__desc">{{ link.description }}</p>
          </div>
        </a>
        <div class="nav-section__item__tip">
          {{ link.url }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.nav-section {
  color: #555;
  padding: 10px 30px 20px;

  &--top {
    background: rgba(148, 217, 234, 0.42);
  }

  &__title {
    font-size: 17px;
    font-weight: 400;
    margin: 16px 0 20px;

    i {
      margin-right: 7px;
    }
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: 20px 25px;
  }

  &__item {
    position: relative;
    width: 22%;
    background: #fff;
    border-radius: 4px;
    transition: all 0.3s ease;
    box-shadow: 1px 1px 12px 0px #d4e0e8;

    @media (max-width: 1440px) {
      width: 28%;
    }
    @media (max-width: 1260px) {
      width: 43%;
    }
    @media (max-width: 1000px) {
      width: 100%;
    }

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
      padding: 12px 15px;
    }

    &__tip {
      position: absolute;
      top: 0;
      left: 50%;
      width: 90%;
      transform: translate(-50%, -25px);
      transition: opacity 0.7s ease-in-out;
      text-align: center;
      padding: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: #eee;
      border-radius: 3px;
      word-break: break-all;
      cursor: default;
      opacity: 0;

      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-top-color: rgba(0, 0, 0, 0.8);
      }
    }

    &:hover {
      transform: translate3d(0, -6px, 0);
      box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3);
      cursor: pointer;
    }

    &:hover &__tip {
      opacity: 0.9;
    }

    &__left {
      width: 40px;
      height: 40px;
      margin-right: 13px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &__right {
      flex: 1;

      &__title {
        margin: 4px 0;
        font-size: 13px;
      }

      &__desc {
        margin: 4px 0;
        color: #979898;
        font-size: 13px;
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
