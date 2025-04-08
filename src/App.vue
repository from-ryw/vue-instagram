<!-- script -->
<script setup>
import axios from 'axios'
import { onMounted, onUnmounted, ref } from 'vue'
import Container from './components/Container.vue'
import filters from './assets/filters'
import { usePostStore } from './stores/postStore'
import { useUploadStore } from './stores/uploadStore'

const postStore = usePostStore()
const uploadStore = useUploadStore()

let lastScrollTop = 0 // 이전 스크롤 위치 기억
let isLoading = false // 중복 실행 방지용 플래그
let count = 0 // GET요청 시, 사용하는 count(more1까지만 요청이 가능)
let realCount = 1 // 실제 count

// 포스트 더보기
async function loadMorePosts() {
  if (isLoading) return // 이미 실행 중이면 무시

  isLoading = true // 실행 시작
  try {
    const result = await axios.get(`https://codingapple1.github.io/vue/more${count}.json`)

    // postImage 랜덤으로 바꾸기
    result.data.postImage = 'https://picsum.photos/600?random=' + Math.floor(Math.random() * 100)

    // filter 랜덤으로 바꾸기
    result.data.filter = filters[Math.floor(Math.random() * filters.length)]

    // content 숫자 바꾸기
    result.data.content = result.data.content.replace(/\d+/, realCount)
    postStore.addPostToBottom(result.data)

    // 카운트 업데이트
    realCount++
    count = (count + 1) % 2 // 0 → 1 → 0 반복(GET요청이 1까지만 가능하므로 변경)
  } catch (err) {
    console.log(err.message)
    console.log('실패')
  } finally {
    isLoading = false // 완료되면 다시 실행 가능하게 설정
  }
}

// 스크롤 감지 함수(상태바가 하단에 닿으면 loadMorePosts() 실행)
function handleScroll() {
  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  if (scrollTop > lastScrollTop) {
    // 아래로 스크롤인 경우
    if (scrollTop + windowHeight >= documentHeight) {
      // 바닥 근처 인지 확인
      loadMorePosts()
    }
  }

  // 현재 스크롤 위치를 다음 비교용으로 저장
  lastScrollTop = scrollTop
}

// 스크롤 이벤트 등록/해제
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Publish 함수
function publish() {
  let myPost = {
    name: 'Ryu Yewon',
    userImage: 'https://picsum.photos/100?random=5',
    postImage: uploadStore.uploadFileURL,
    likes: 0,
    date: getToday(),
    liked: false,
    content: uploadStore.uploadContent,
    filter: uploadStore.uploadFileFilter,
  }
  postStore.addPostToTop(myPost)
  uploadStore.reset()
}

// Image upload 함수
function uploadImage(e) {
  let file = e.target.files
  let url = URL.createObjectURL(file[0])
  uploadStore.setUploadFileURL(url)
  uploadStore.setUploadFileFilter('')
  uploadStore.setStep(1)
}

// 오늘 날짜 함수
function getToday() {
  const today = new Date()
  const options = { month: 'short', day: 'numeric' }
  return today.toLocaleDateString('en-US', options)
}
</script>

<!-- template -->
<template>
  <div class="header">
    <ul
      class="header-button-left"
      v-if="uploadStore.step > 0"
      @click="uploadStore.setStep(uploadStore.step - 1)"
    >
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right" v-if="uploadStore.step > 0">
      <li v-if="uploadStore.step == 1" @click="uploadStore.setStep(2)">Next</li>
      <li v-else-if="uploadStore.step == 2" @click="publish()">Publish</li>
    </ul>
    <img src="./assets/logo.svg" class="logo" />
  </div>

  <!-- Container -->
  <Container :filters="filters" />

  <div class="footer">
    <ul class="footer-button-plus" v-if="uploadStore.step == 0">
      <input type="file" id="file" class="inputfile" @change="uploadImage" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<!-- style -->
<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  padding-right: 20px;
  margin-top: 10px;
  text-align: right;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: 'consolas';
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
