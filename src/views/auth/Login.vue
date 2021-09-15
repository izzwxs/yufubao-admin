<template>
  <a-form ref="formLogin" :form="form" @submit="handleSubmit">
    <a-form-item>
      <a-input
        size="large"
        type="text"
        placeholder="请输入用户名..."
        v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: '请输入用户名或手机号!' }],
            validateTrigger: 'blur'
          }
        ]"
      >
        <a-icon
          slot="prefix"
          type="user"
          :style="{ color: 'rgba(0,0,0,.25)' }"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input-password
        size="large"
        placeholder="请输入密码..."
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: '请输入密码！' }],
            validateTrigger: 'blur'
          }
        ]"
      >
        <a-icon
          slot="prefix"
          type="lock"
          :style="{ color: 'rgba(0,0,0,.25)' }"
        />
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-button block type="primary" size="large" html-type="submit">
        登 录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    ...mapActions(['Login']),
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        if (error) return false
        const loginParams = { ...values, ...{ type: 1 } }
        this.Login(loginParams).then(() => this.loginSuccess())
      })
    },
    loginSuccess() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
