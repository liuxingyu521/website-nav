<script lang="ts" setup>
import { ref } from 'vue'
import Logo from './logo.vue'
import SideNav from './sidenav.vue'
import NavSection from './nav-section.vue'
import About from './about.vue'
import Footer from './footer.vue'
import Search from '@/components/search/index.vue'
import Feedback from '@/components/feedback/index.vue'

const props = defineProps({
  menus: {
    type: Array,
    default: () => [],
  },
})

const isSideNavActive = ref(false)

const navSections = props.menus
  .map((item: any) => {
    if (item.subMenu) {
      return [...item.subMenu]
    }

    return item
  })
  .flat()

const toggleSideNav = () => {
  isSideNavActive.value = !isSideNavActive.value
}

const sideMenus = props.menus.concat({
  title: '关于本站',
  icon: 'fa-heart heart',
})
</script>

<template>
  <SideNav v-model:isActive="isSideNavActive" :menus="sideMenus" />
  <div class="nav-container">
    <div class="nav-container__top">
      <Search />
    </div>
    <div class="nav-container__top--mobile">
      <Logo />
      <div class="nav-container__top--mobile-right">
        <Search />
        <span class="menu" @click="toggleSideNav">
          <i class="fa-bars fa-lg" />
        </span>
      </div>
    </div>
    <NavSection
      v-for="section in navSections"
      :key="section.title"
      :section="section"
    />
    <About />
    <Feedback />
    <Footer />
  </div>
  <div
    class="mask"
    :class="[isSideNavActive && 'mask--active']"
    @click="toggleSideNav"
  ></div>
</template>

<style lang="less">
@import '@/css/index.less';

.nav-container {
  height: 100%;
  overflow-y: auto;
  padding-top: 90px;
  box-sizing: border-box;
  margin-left: var(--sidebar-width);
  transition: all 0.5s ease-in-out;
  position: relative;

  @media (max-width: 1000px) {
    margin-left: 0;
  }

  &__top {
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    height: 90px;
    display: flex;
    align-items: center;
    width: 100%;

    .search {
      color: #333;
    }
  }

  &__top--mobile {
    position: absolute;
    height: 90px;
    top: 0;
    left: 0;
    width: 100%;
    background: #2c2e2f;
    padding: 0 30px;
    justify-content: space-between;
    align-items: center;
    transition: all 0.5s ease-in-out;
    display: none;

    @media (max-width: 1000px) {
      display: flex;
    }

    &-right {
      display: inline-flex;
      gap: 0 10px;
    }
  }

  .menu {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #eee;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  pointer-events: none;
  transition: all 0.3s ease-in-out;

  &--active {
    background: rgba(0, 0, 0, 0.5);
    pointer-events: all;
  }
}

.heart {
  color: lightcoral;
}
</style>
