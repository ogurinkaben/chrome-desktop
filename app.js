const { createApp, ref } = Vue;

createApp({
  setup() {
    const message = ref("Hello vue!");
    console.log(message);
    return {
      message,
    };
  },
}).mount("#app");
