<template>
  <div class="tool">
    <div @click="event">
      <i :class="iconClass"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "tool",
  props: ["event", "iconClass"],
};
</script>

<style scoped lang="less">
.tool {
  align-items: center;
  justify-content: space-between;
  display: flex;
  font-size: 16px;
  padding: 2px 5px;
  &:hover {
    cursor: pointer;
    color: #4287f5;
  }
}
</style>
