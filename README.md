# 인스타그램 클론 프로젝트 (Vue.js 3)

[배포된 사이트 바로가기](https://from-ryw-vue-insta.netlify.app/)

![프로젝트 미리보기](./src/assets/vue-instagram.gif)

이 프로젝트는 [코딩애플 - 인스타그램을 만들며 배워보는 Vue.js 3 완벽 가이드](https://codingapple.com/) 강의를 기반으로 제작되었습니다.  
강의에서 제공된 기본 코드를 바탕으로 **Vue 3 Composition API 문법에 맞게 수정**하고,  
직접 기능을 구현하거나 개선하여 **학습 목적의 클론 프로젝트**로 완성하였습니다.

> ⚠️ 본 프로젝트는 교육 및 포트폴리오 용도로만 사용되며, 상업적 용도는 아닙니다.

<br>

## ✨ 주요 구현 기능

![작성 및 게시](./src/assets/vue-instagram___작성및게시.gif)

- 이미지 업로드 및 미리보기
- 필터 선택 기능 (여러 가지 필터 중 선택 가능)
- 게시글 내용 작성 기능
  <br>
  <br>

![좋아요 토글](./src/assets/vue-instagram___좋아요토글.gif)

- 좋아요 토글 (하트 애니메이션 포함)
  <br>
  <br>

![더보기](./src/assets/vue-instagram___더보기.gif)

- 스크롤 하단 감지 시 다음 게시물 자동 불러오기(더보기)

<br>

## 🔧 사용 기술 스택

| 영역       | 기술                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------- |
| 프레임워크 | Vue.js 3 (Composition API)                                                                  |
| 빌드 도구  | Vite                                                                                        |
| 상태관리   | main 브랜치: ref, reactive, props, emits 등 Vue 기본 기능 <br> pinia-refactor 브랜치: Pinia |
| HTTP 통신  | Axios                                                                                       |
| 배포       | Netlify                                                                                     |

<br>

## 📂 브랜치 설명

### **main** 브랜치

- **기본 프로젝트**: Vue 3 Composition API를 기반으로, 코딩애플 강의를 수강한 후 기능을 수정하여 만든 인스타그램 클론 프로젝트입니다.

### **v-model-refactor** 브랜치

- **`textarea` 양방향 데이터 바인딩**: 사용자 입력을 처리하기 위해 props와 emit을 사용하던 방식에서 v-model을 활용하여 **textarea**의 값 변경을 양방향 바인딩 방식으로 변경하였습니다.

### **pinia-refactor** 브랜치

- **Pinia 상태 관리 추가**: 기존 상태 관리 방식을 Pinia로 교체하여 상태 관리를 중앙화하고, 컴포넌트 간 데이터 공유 및 상태 업데이트를 개선했습니다.
