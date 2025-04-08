import { defineStore } from 'pinia'
import posts from '../assets/posts'

export const usePostStore = defineStore('post', {
  state: () => ({
    postList: [...posts],
  }),
  actions: {
    addPostToTop(post) {
      this.postList.unshift(post)
    },
    addPostToBottom(post) {
      this.postList.push(post)
    },
    appendPosts(posts) {
      this.postList.unshift(posts)
    },
    toggleLike(index) {
      const post = this.postList[index]
      post.liked = !post.liked
      if (post.liked) {
        post.likes++
      } else {
        post.likes--
      }
    },
  },
})
