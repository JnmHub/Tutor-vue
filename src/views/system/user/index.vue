<template>
  <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
</template>

<script lang="ts" name="SystemUser" setup>
import type { FormInst } from "naive-ui";
import { useMessage } from "naive-ui";
import { defineComponent, ref } from "vue";
const demo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success");
    }, 1000);
  });
};
const formValue = ref({
  user: {
    name: "",
    age: "",
  },
  phone: "",
});
onMounted(async () => {
  await demo();
  console.log("用户okok");
});
</script>
