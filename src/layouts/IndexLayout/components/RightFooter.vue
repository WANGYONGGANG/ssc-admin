<template>
    <div class="indexlayout-right-footer">
      <div class="footer-links">
        
      </div>
      <div></div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: 'RightFooter',
    components: {
    }
})
</script>
<style lang="less" scoped>
.indexlayout-right-footer {
  height: 50px;
  overflow: hidden;
  text-align: center;
  font-size: 14px;
  color: #808695;
  .footer-links {
    margin-bottom: 10px;
    a {
      margin-right: 30px;
      color: #808695;
      text-decoration: none;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        color: #515a6e;
      }
    }
  }
}
</style>