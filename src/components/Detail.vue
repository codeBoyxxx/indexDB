<template>
  <div>详情页面</div>
</template>

<script>
export default {
  // 详情页面的beforeRouteLeave钩子函数
  beforeRouteLeave (to, from, next) {
    if (to.name == 'index') {
      to.meta.isUseCache = true;
    }
    next();
  }
}
</script>


<style scoped>

</style>

