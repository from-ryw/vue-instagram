<!-- script -->
<script setup>
import { ref } from 'vue';

const props = defineProps({
                post: {
                  name: String,
                  userImage: String,
                  postImage: String,
                  likes: Number,
                  date: String,
                  liked: Boolean,
                  content: String,
                  filter: String
                }
              });
const emit = defineEmits(['toggle-like']);
const heartRef = ref(null);

// post-body 또는 heart 클릭 시, like toggle 이벤트
function toggleLike() {
  emit('toggle-like'); // Container.vue(부모)에게 전달

   // 하트 애니메이션
   if (heartRef.value) {
    heartRef.value.classList.add('heart-active')
    setTimeout(() => {
      heartRef.value.classList.remove('heart-active')
    }, 250)
  }
}

</script>


<!-- template -->
<template>
  <div class="post">
    <div class="post-header">
      <div class="profile" :style="{ backgroundImage: `url(${post.userImage})` }"></div>
      <span class="profile-name">{{ post.name }}</span>
    </div>
    <div class="post-body" 
        :class="`${post.filter}`" 
        :style="{ backgroundImage: `url(${post.postImage})`}"
        @click="toggleLike"></div>
    <div class="post-content">
      <div class="like-row">
        <span class="heart" ref="heartRef" @click="toggleLike">{{ post.liked ? '❤️' : '🤍' }}</span>
        <p>{{ post.likes }} Likes </p>
      </div>
      <p><strong>{{ post.name }}</strong> {{ post.content }}</p>
      <p class="date">{{ post.date }}</p>
    </div>
  </div>
</template>


<!-- style -->
<style>
.post {
  width: 100%;
  padding-bottom: 20px;
}
.profile {
  background-image: url("https://picsum.photos/100?random=0");
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}
.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
.post-header {
  height: 30px;
  padding: 10px;
}
.post-body {
  background-image: url("https://picsum.photos/600?random=0");
  height: 450px;
  background-position: center;
  background-size: cover;
}
.post-content {
  padding-left: 12px;
  padding-right: 15px;
  font-size: 14px;
}
.post-content p {
  margin: 0;
  line-height: 1.4;
}
.post-content > p:nth-of-type(2) {
  margin-top: 4px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
}
.like-row {
  display: flex;
  align-items: end;
  gap: 6px;
  padding: 5px 0;
}
.heart {
  display: inline-block;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.1s ease;
}
.heart-active {
  transform: scale(1.3);
}
</style>