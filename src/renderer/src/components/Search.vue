<template>
  <div class="flex w-full h-[65px]">
    <input
      type="text"
      placeholder="你好..."
      autofocus
      class="w-full h-full input input-ghost input-xl focus:outline-none select-none"
      @click="fun"
    />
    <div class="h-full avatar p-[0.75rem] pl-0 select-none">
      <div class="h-full rounded-full">
        <img
          draggable="false"
          class="pointer-events-none"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
