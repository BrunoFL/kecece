<template>
  <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
    <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer outline-none" v-bind:checked="toggled" v-on:click="toggle" />
    <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-white cursor-pointer"></label>
  </div>
  <label for="toggle" class="text-xs">{{ label }}</label>
</template>

<script>
export default {
  name: "Toggle",
  emits: ["toggled"],
  props: {
    label: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      toggled: this.checked,
    };
  },
  methods: {
    toggle() {
      this.toggled = !this.toggled;
      this.$emit("toggled", this.toggled);
    },
  },
};
</script>

<style>
.toggle-checkbox:checked {
  right: 0;
  border-color: #68d391;
}
.toggle-checkbox:checked + .toggle-label {
  background-color: #68d391;
}
</style>
