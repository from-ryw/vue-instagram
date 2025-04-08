<!-- script -->
<script setup>
import { useUploadStore } from '../stores/uploadStore'

const props = defineProps({
  filter: String,
  isSelected: Boolean,
})

const uploadStore = useUploadStore()
</script>

<!-- template -->
<template>
  <div class="filter-box">
    <p class="filter-name">{{ filter }}</p>
    <div
      class="filter-item"
      :class="[filter, { selected: isSelected }]"
      :style="{ backgroundImage: `url(${uploadStore.uploadFileURL})` }"
      @click="uploadStore.setUploadFileFilter(filter)"
    ></div>
  </div>
</template>

<!-- style -->
<style>
.filter-box {
  display: inline-block;
  text-align: center;
}
.filter-name {
  margin: 0;
  margin-top: 4px;
  font-size: 13px;
  text-align: center;
  color: grey;
}
.filter-item {
  width: 100px;
  height: 100px;
  margin: 4px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
.selected {
  outline: 3px solid #999;
  box-shadow: 0 0 10px rgba(150, 150, 150, 0.4);
  border-radius: 6px;
  transition: all 0.2s ease;
}
</style>
