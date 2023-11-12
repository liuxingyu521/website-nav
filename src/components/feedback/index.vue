<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { createWebsite, goAuthorize } from '@/apis/github'
import { useGithubAccess, useGlobalFeedbackVisible } from '@/store'

const isActive = useGlobalFeedbackVisible()
const isSubmitSuccess = ref(false)
const formRef = ref<FormInstance>()
const loadingState = reactive({ submit: false })
const githubAccessToken = useGithubAccess()

const form = ref({
  title: undefined,
  url: undefined,
  desc: undefined,
})

const rules = reactive<FormRules>({
  title: [{ required: true, message: '请输入网站名称', trigger: 'blur' }],
  url: [{ required: true, message: '请输入网站链接', trigger: 'blur' }],
})

const handleToggleFeedback = () => {
  form.value = {
    title: undefined,
    url: undefined,
    desc: undefined,
  }

  formRef.value?.clearValidate()
  isActive.value = !isActive.value
  isSubmitSuccess.value = false
}

const handleSubmit = async () => {
  if (loadingState.submit || isSubmitSuccess.value) {
    return
  }

  const isValid = await formRef.value?.validate()

  if (!isValid) {
    return
  }

  loadingState.submit = true
  // @ts-expect-error form.value already with the data
  const { error } = await createWebsite(form.value)

  if (!error.value) {
    isSubmitSuccess.value = true

    setTimeout(() => {
      isActive.value = false
    }, 1000)
  }

  loadingState.submit = false
}
</script>

<template>
  <div class="feedback" title="添加链接" @click="handleToggleFeedback">
    <i
      class="i-fa-plus"
      :class="{
        active: isActive,
      }"
    ></i>

    <Teleport to="body">
      <transition name="pop">
        <div v-show="isActive" class="feedback-modal">
          <h3 style="text-align: center; margin-top: 0">添加导航</h3>
          <el-form
            ref="formRef"
            :model="form"
            label-position="top"
            :rules="rules"
          >
            <el-form-item label="网站标题" prop="title">
              <el-input v-model="form.title" placeholder="请输入网站标题" />
            </el-form-item>
            <el-form-item label="网站链接" prop="url">
              <el-input v-model="form.url" placeholder="请输入网站链接" />
            </el-form-item>
            <el-form-item label="网站简介">
              <el-input
                v-model="form.desc"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                placeholder="请输入网站简介"
              />
            </el-form-item>

            <el-button
              v-if="!githubAccessToken"
              class="feedback-modal__authorize"
              color="#24292f"
              round
              @click="goAuthorize"
            >
              <i class="i-fa-github" style="margin-right: 10px"></i>
              使用 github 登录
            </el-button>
            <el-button
              v-else
              class="feedback-modal__submit"
              :type="isSubmitSuccess ? 'success' : 'primary'"
              :loading="loadingState.submit"
              @click="handleSubmit"
              >{{ `提交${isSubmitSuccess ? '成功' : ''}` }}</el-button
            >
          </el-form>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style lang="less">
.feedback {
  position: fixed;
  bottom: 80px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: navajowhite;
  box-shadow: 1px 1px 4px 1px #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;

  &:hover {
    box-shadow: 1px 2px 8px 2px #ddd;
    cursor: pointer;
    transform: translateY(-1px);
  }

  .i-fa-plus {
    font-size: 18px;
    color: lightcoral;
    transition: all 0.2s linear;

    &.active {
      transform: rotate(-135deg);
    }
  }

  &-modal {
    position: absolute;
    bottom: 140px;
    right: 30px;
    width: 320px;
    height: 420px;
    background-color: #f8f8f8;
    border-radius: 5px;
    border: 1px solid #eee;
    box-shadow: 0px 0px 10px 4px #f1f1f1;
    padding: 24px 20px;
    overflow: auto;

    &__submit,
    &__authorize {
      width: 100%;
      margin-top: 10px;
    }
  }
}

.pop-enter-from,
.pop-leave-to {
  transform: scale(0);
  transform-origin: 100% 100%;
  opacity: 0.6;
}

.pop-enter-to,
.pop-leave-from {
  transform: scale(1);
  transform-origin: 100% 100%;
  opacity: 1;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
</style>
