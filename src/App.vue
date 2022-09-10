<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container mx-auto">
    <div class="main-content">
      <h1 class="header">Tasks</h1>
      <div class="tab">
        <div class="tab-labels">
          <router-link to="/" class="label cursor-pointer">
            <span class="uppercase">IMAGES TASK with button</span>
          </router-link>
          <router-link to="/extra-tasks" class="label cursor-pointer">
            <span class="uppercase">EXTRA CHALLENGE</span>
          </router-link>
          <router-link to="/images-with-scroll" class="label cursor-pointer">
            <span class="uppercase">IMAGES TASK with infinite scroll</span>
          </router-link>
        </div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
.main-content {
  margin: 0 2rem;
}

.main-content .header {
  font-weight: 500;
  font-size: 30px;
  margin: 0;
  padding: 1rem 0 0;
  letter-spacing: 0.58px;
}

.main-content .tab .tab-labels {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #d8d8d8;
  margin: 2rem 0;
}

.main-content .tab .tab-labels .label {
  margin: 0 44px 0 0;
  font-weight: 500;
  padding: 0 0 16px 0;
  font-size: 12px;
  letter-spacing: 0.6px;
  position: relative;
}

.main-content .tab .tab-content {
  max-height: calc(100vh - (220px + 2rem));
  overflow-y: auto;
}

.main-content .tab .actions {
  margin: 8px 0 44px 0;
}

.router-link-active {
  border-bottom: 2px solid #5d57f4;
}
</style>
