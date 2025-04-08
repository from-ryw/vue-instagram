import { defineStore } from 'pinia'

export const useUploadStore = defineStore('upload', {
  state: () => ({
    step: 0,
    uploadFileURL: '',
    uploadFileFilter: '',
    uploadContent: '',
  }),
  actions: {
    setStep(val) {
      this.step = val
    },
    setUploadFileURL(url) {
      this.uploadFileURL = url
    },
    setUploadFileFilter(filter) {
      if (this.uploadFileFilter == filter) {
        this.uploadFileFilter = ''
      } else {
        this.uploadFileFilter = filter
      }
    },
    setUploadContent(content) {
      this.uploadContent = content
    },
    reset() {
      this.step = 0
      this.uploadFileURL = ''
      this.uploadFileFilter = ''
      this.uploadContent = ''
    },
  },
})
