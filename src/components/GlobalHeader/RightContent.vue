<template>
  <div :class="wrpCls">
    <a-dropdown placement="bottomRight" :class="prefixCls">
      <span class="ant-pro-account-avatar">
        <a-avatar size="small" :src="avatar" class="antd-pro-global-header-index-avatar" />
        <span style="margin-left: 8px">{{ nickname }}</span>
      </span>
      <template v-slot:overlay>
        <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
          <a-menu-item v-if="showMenu" key="settings" @click="handleToSettings">
            <a-icon type="setting" />
            <span>个人设置</span>
          </a-menu-item>
          <a-menu-divider v-if="showMenu" />
          <a-menu-item key="logout" @click="handleLogout">
            <a-icon type="logout" />
            <span>退出登录</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue'
import { mapGetters } from 'vuex'
export default {
  name: 'RightContent',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    }
  },
  data() {
    return {
      showMenu: true
    }
  },
  computed: {
    ...mapGetters(['avatar', 'nickname']),
    wrpCls() {
      return {
        'ant-pro-global-header-index-right': true,
        'ant-pro-global-header-index-light': true
      }
    }
  },
  methods: {
    handleToSettings() {
      this.$router.push({ path: '/account' })
    },
    handleLogout() {
      Modal.confirm({
        title: '提示',
        content: '确定要注销并退出本系统吗?',
        onOk: () => {
          this.$store.dispatch('Logout').then(() => {
            this.$router.push({ name: 'Login' })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
