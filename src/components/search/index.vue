<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMagicKeys } from '@vueuse/core'
import type { ILink } from '@/config/websites'
import { AllLinks } from '@/config/websites'

defineOptions({
  name: 'SearchComp',
})

const isShow = ref(false)
const searchValue = ref()
const searchResults = ref<ILink[]>([])
const inputRef = ref()

const handleOpenSearch = () => {
  searchResults.value = []
  searchValue.value = ''
  isShow.value = true

  setTimeout(() => {
    inputRef.value.focus()
  }, 0)
}

const handleSearch = (e: any) => {
  const value = e.target.value

  searchResults.value
    = value.length > 0
      ? AllLinks.filter(
        item =>
          [item.title, item.description].some(it => new RegExp(value, 'i').test(it)),
      )
      : []
}

const handleOpenLink = (link: ILink) => {
  window.open(link.url)
}

const { escape, meta_k } = useMagicKeys()

/** esc 退出搜索 */
watch(escape, (isClickedESC) => {
  if (isClickedESC) {
    isShow.value = false
  }
})

/** 搜索快捷键 '/' */
watch(meta_k, (isClickMetaK) => {
  if (isClickMetaK && !isShow.value) {
    handleOpenSearch()
  }
})
</script>

<template>
  <span
    title="站内搜索"
    @click="handleOpenSearch"
  >
    <slot>
      <span class="search">
        <i class="i-fa-search" />
      </span>
    </slot>
  </span>

  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isShow"
        class="modal-mask"
        @click="isShow = false"
      >
        <div
          class="modal-container"
          @click.stop
        >
          <div class="modal-header">
            <input
              ref="inputRef"
              v-model="searchValue"
              placeholder="站内搜索关键词(支持正则)"
              class="modal-header__input"
              @input="handleSearch"
            >
            <div class="modal-header__total">
              {{ `${searchResults.length} 条结果` }}
            </div>
          </div>

          <div class="modal-body search-result">
            <div
              v-for="(item, i) in searchResults"
              :key="Math.random() + i"
              class="search-result__item"
              :title="item.url"
              @click="handleOpenLink(item)"
            >
              <div class="search-result__item-title">
                {{ `${i + 1}、 ${item.title}` }}
              </div>
              <div class="search-result__item-desc">
                {{ item.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="less">
.search {
  width: 30px;
  height: 30px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &-result {
    &__item {
      background: lightcyan;
      padding: 8px 4px;
      border-radius: 2px;
      border: 1px solid #eee;
      margin-bottom: 5px;
      cursor: pointer;
      &:hover {
        &:hover {
          transform: translate(2px, 0px);
          transition: all 0.2s;
        }
      }

      &-title {
        font-size: 15px;
        color: #333;
        font-weight: 500;
      }

      &-desc {
        margin-top: 5px;
        color: #666;
      }
    }
  }
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 15px 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  margin-top: 150px;
  background: #97dced;
  max-height: 400px;
  display: flex;
  flex-direction: column;

  @media (max-width: 800px) {
    width: 300px;
  }
}

.modal-header {
  flex-shrink: 0;
  padding-bottom: 24px;
  position: relative;

  &__total {
    color: fuchsia;
    position: absolute;
    bottom: 0;
    font-size: 10px;
    font-style: italic;
    padding-left: 10px;
  }

  &__input {
    padding: 10px 12px;
    width: 100%;
    background: hsl(0deg 0% 99%);
    border: 1px solid #eee;
    border-radius: 4px;
    line-height: 1.2;
  }
}

.modal-body {
  margin-top: 10px;
  flex: 1;
  overflow: hidden auto;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}
</style>
