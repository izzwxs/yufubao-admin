<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="val => (collapsed = val)"
    v-bind="settings"
  >
    <template v-slot:menuHeaderRender>
      <img src="../assets/logo.svg" alt="logo" />
      <h1>{{ title }}</h1>
    </template>
    <template v-slot:rightContentRender>
      <RightContent />
    </template>
    <router-view />
  </pro-layout>
</template>

<script>
import { mapState } from 'vuex'
import RightContent from '@/components/GlobalHeader/RightContent'
export default {
  name: 'BasicLayout',
  components: { RightContent },
  data() {
    return {
      menus: [],
      collapsed: false,
      title: 'Antdv-Base-Admin',
      settings: {
        theme: 'light',
        layout: 'sidemenu',
        contentWidth: 'Fluid',
        primaryColor: '#5F63F2',
        fixedHeader: true,
        fixSiderbar: true,
        colorWeak: false,
        hideHintAlert: false,
        hideCopyButton: false
      },
      query: {},
      isMobile: false
    }
  },
  computed: {
    ...mapState({ mainMenu: state => state.permission.addRouters })
  },
  created() {
    const routes = this.mainMenu.find(item => item.path === '/')
    this.menus = (routes && routes.children) || []
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    handleMediaQuery(val) {
      this.query = val
      if (this.isMobile && !val['screen-xs']) {
        return (this.isMobile = false)
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
        this.settings.contentWidth = 'Fluid'
      }
    }
  }
}
</script>

<style lang="less">
.ant-layout-footer {
  padding: 0 !important;
}
</style>
