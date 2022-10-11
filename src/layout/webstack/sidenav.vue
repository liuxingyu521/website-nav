<script lang="ts" setup>
import { ref, watch } from 'vue'
import Logo from './logo.vue'

const props = defineProps({
  menus: Array,
  isActive: Boolean,
})
const emit = defineEmits(['update:isActive'])

const innerMenus = ref<any[]>([])

watch(
  () => props.menus,
  (newMenus: any) => {
    innerMenus.value = newMenus.map((item: any) => {
      const menu = { ...item }

      if (menu.subMenu) {
        menu.isExpand = false
      }

      return menu
    })
  },
  { immediate: true }
)

const goToAnchor = (id: string) => {
  // 小屏幕下需要关闭侧边栏，去掉 active 的类
  emit('update:isActive', false)

  const target = document.getElementById(id)

  document
    .querySelector('.nav-container')
    ?.scrollTo({ top: (target?.offsetTop || 0) - 30, behavior: 'smooth' })
}

const toggleExpand = (menu: any) => {
  innerMenus.value = innerMenus.value.map((item) => {
    if (item.title === menu.title) {
      item.isExpand = !item.isExpand
    }

    return item
  })
}

function enter(el: HTMLElement, done: Function) {
  const elHeight = el.getBoundingClientRect().height

  el.style.setProperty('--height', `${elHeight}px`)
  el.classList.add('enter')

  setTimeout(() => {
    done()
  })
}

function afterEnter(el: HTMLElement) {
  el.classList.add('expand')
  el.classList.remove('enter')
}

function leave(el: HTMLElement, done: Function) {
  el.classList.remove('expand')
  el.classList.add('enter')

  setTimeout(() => {
    done()
  }, 1000)
}
</script>

<template>
  <div class="sidenav" :class="[isActive && 'sidenav--active']">
    <div class="sidenav__top">
      <Logo />
    </div>
    <ul class="sidenav__list">
      <li v-for="menu in innerMenus" :key="menu.title">
        <template v-if="menu.subMenu">
          <span
            class="sidenav__list__item multiple"
            @click="toggleExpand(menu)"
          >
            <span>
              <i class="fam" :class="[menu.icon || 'fa-bookmark-o']"></i>
              <span>{{ menu.title }}</span>
            </span>
            <span
              class="arrow fa fa-angle-right"
              :class="[menu.isExpand ? 'arrow--expand' : '']"
            ></span>
          </span>
          <transition
            :css="false"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
          >
            <ul v-if="menu.isExpand" class="sidenav__list__second">
              <li
                v-for="(m, index) in menu.subMenu"
                :key="m.title"
                :style="{
                  '--offset-width': `-${index * 20 + 20}px`,
                }"
              >
                <span
                  class="sidenav__list__item"
                  @click="goToAnchor(m.title.replace(/\s/, '_'))"
                >
                  <span>{{ m.title }}</span>
                </span>
              </li>
            </ul>
          </transition>
        </template>

        <span
          v-else
          class="sidenav__list__item"
          @click="goToAnchor(menu.title.replace(/\s/, '_'))"
        >
          <i :class="menu.icon"></i>
          <span>{{ menu.title }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style lang="less">
.sidenav {
  width: var(--sidebar-width, 280px);
  background: #2c2e2f;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
  z-index: 1;
  transition: all 0.5s ease-in-out;

  @media (max-width: 1000px) {
    left: -100%;
  }

  &::-webkit-scrollbar {
    width: var(--scrollbar-width, 5px);
  }

  &::-webkit-scrollbar-thumb {
    background: #808281;
    visibility: hidden;
    transition: visibility 0.5s ease-in-out;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      visibility: visible;
    }
  }

  &--active {
    left: 0;
  }

  &__top {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  &__list {
    margin-top: 0;
    margin-bottom: 0;
    padding: 20px 40px;
    list-style: none;
    flex: 1;

    &__item {
      color: #979898;
      text-decoration: none;
      display: block;
      padding: 13px 5px;
      border-bottom: 1px solid #313437;
      transition: all 220ms ease-in-out;
      cursor: pointer;

      &:hover {
        color: #fff;
      }

      i {
        display: inline-block;
        margin-right: 15px;
      }

      &.multiple {
        user-select: none;

        .arrow {
          float: right;
          transition: all 0.3s ease-in-out;

          &--expand {
            transform: rotate(90deg);
          }
        }
      }
    }

    &__second {
      list-style: none;
      overflow: hidden;
      transition: all 0.25s ease;

      &.enter {
        height: 0;
      }

      li {
        transition: all 0.5s cubic-bezier(0.64, -0.01, 0.23, 0.98);
        transform: translateX(var(--offset-width));
        opacity: 0;
      }

      &.expand {
        height: var(--height);

        li {
          transform: translateX(0);
          opacity: 1;
        }
      }
    }
  }
}
</style>
