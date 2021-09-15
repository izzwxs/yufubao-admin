<template>
  <div class="user-layout-wrapper">
    <div class="container">
      <div class="header">
        <img src="~@/assets/logo.svg" class="logo" />
        <span class="title">Antdv-Base-Admin</span>
      </div>
      <div class="desc">
        基于SpringBoot，Spring Security，JWT，Vue 的前后端分离权限管理系统
      </div>
      <div class="section">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLayout'
}
</script>

<style lang="less" scoped>
.user-layout-wrapper {
  height: 100vh;

  .container {
    position: relative;
    padding: 110px 0 144px;
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    background-size: 100%;

    a {
      text-decoration: none;
    }

    .header {
      height: 44px;
      line-height: 44px;
      text-align: center;

      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
        border-style: none;
      }

      .title {
        font-size: 32px;
        line-height: 44px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: bold;
      }
    }

    .desc {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
      margin: 12px 0 40px;
    }

    .section {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }
  }
}
</style>
