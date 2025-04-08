<!-- script -->
<script setup>
import { ref, watch } from 'vue'
import Post from './Post.vue'
import FilterBox from './FilterBox.vue'

const props = defineProps({
  postList: Array,
  filters: Array,
  step: Number,
  uploadFileURL: String,
  uploadFileFilter: String,
  uploadContent: String,
})
const emit = defineEmits(['toggle-like', 'select-filter', 'write-content'])

const localContent = ref(props.uploadContent)

// localContent가 바뀔 때마다 부모에게 emit
watch(localContent, (newVal) => {
  emit('write-content', newVal)
})
</script>

<!-- template -->
<template>
  <div class="container">
    <!-- Post -->
    <Post
      v-if="step == 0"
      v-for="(post, index) in postList"
      :key="index"
      :post="post"
      @toggle-like="emit('toggle-like', index)"
    />

    <!-- FilterBox  -->
    <div v-if="step == 1">
      <div
        class="upload-image"
        :class="`${uploadFileFilter}`"
        :style="`background-image:url(${uploadFileURL})`"
      ></div>
      <div class="filters">
        <FilterBox
          v-for="(filter, index) in filters"
          :key="index"
          :uploadFileURL="uploadFileURL"
          :filter="filter"
          :isSelected="uploadFileFilter === filter"
          @select-filter="emit('select-filter', $event)"
        />
      </div>
    </div>

    <!-- WriteArea -->
    <div class="write-area" v-if="step == 2">
      <div
        :class="`upload-image ${uploadFileFilter}`"
        :style="{ backgroundImage: `url(${uploadFileURL})` }"
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
