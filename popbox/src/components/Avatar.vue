<script setup>
// import clsx from "clsx";
defineProps({
  src: String,
  alt: String,
  className: String,
  height: {
    type: String,
    default: "10",
  },
  width: {
    type: String,
    default: "10",
  },
});

// console.log(src);
</script>

<template>
  <div>
    <img
      :src="src ? `http://localhost:3000/upload/${src}` : '/user.png'"
      :class="['rounded-full', className, `h-${height} w-${width}`]"
      :alt="alt"
    />
  </div>
</template>
