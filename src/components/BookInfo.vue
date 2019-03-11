<template>
  <div>
      <img class="img" :src="info.image"  mode='aspectFit'>
  </div>
</template>
<script>
export default {
  props: ['info']
}
</script>
<style>

</style>
