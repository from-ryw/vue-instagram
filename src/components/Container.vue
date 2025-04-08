<!-- script -->
<script setup>
import { ref, watch } from 'vue'
import Post from './Post.vue'
import FilterBox from './FilterBox.vue'
import { usePostStore } from '../stores/postStore'
import { useUploadStore } from '../stores/uploadStore'

const postStore = usePostStore()
const uploadStore = useUploadStore()

const props = defineProps({
  filters: Object,
})

const localContent = ref(uploadStore.uploadContent)
watch(localContent, (newVal) => {
  uploadStore.setUploadContent(newVal)
})
</script>

<!-- template -->
<template>
  <div class="container">
    <!-- Post -->
    <Post
      v-if="uploadStore.step == 0"
      v-for="(post, index) in postStore.postList"
      :key="index"
      :post="post"
      :index="index"
    />

    <!-- FilterBox  -->
    <div v-if="uploadStore.step == 1">
      <div
        class="upload-image"
        :class="`${uploadStore.uploadFileFilter}`"
        :style="`background-image:url(${uploadStore.uploadFileURL})`"
      ></div>
      <div class="filters">
        <FilterBox
          v-for="(filter, index) in filters"
          :key="index"
          :filter="filter"
          :isSelected="uploadStore.uploadFileFilter === filter"
        />
      </div>
    </div>

    <!-- WriteArea -->
    <div class="write-area" v-if="uploadStore.step == 2">
      <div
        :class="`upload-image ${uploadStore.uploadFileFilter}`"
        :style="{ backgroundImage: `url(${uploadStore.uploadFileURL})` }"
      ></div>
      <div class="write">
        <textarea
          class="write-box"
          placeholder="내용을 입력하세요."
          v-model="localContent"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<!-- style -->
<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
