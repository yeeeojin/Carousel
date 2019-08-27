<template>
  <div>
    <h3>Carousel</h3>
    <div class="slide">
      <img class="list-item" :src="getPhotoList[currentIdx].imageUrl">
    </div>
    <button class="button-prev" @click="onPrev">{{ lt }}</button>
    <span>{{ getPhotoList[currentIdx].title }}</span>
    <button class="button-next" @click="onNext">{{ rt }}</button>
    <h3>이미지 삭제</h3>
    <div>
      <label>
        id: <input type="text" v-model="deleteNum">
      </label>
      <button>삭제</button>
    </div>
  </div>
</template>

<script>
// store
import { mapGetters } from 'vuex'

export default {
  name: 'Carousel',
  data () {
    return {
      lt: '<',
      rt: '>',
      slideTimer: 5000,
      currentIdx: 0,
      timer: null,
      deleteNum: null
    }
  },
  computed: {
    ...mapGetters(['getPhotoList'])
  },
  mounted () {
    this.startRotation();
  },
  methods: {
    startRotation () {
      this.timer = setInterval(() => {
        this.changeImage();
      }, this.slideTimer);
    },
    stopRotation () {
      clearTimeout(this.timer);
      this.timer = null;
    },
    changeImage () {
      this.currentIdx++;
      if (this.currentIdx >= this.getPhotoList.length) {
        this.currentIdx = 0;
      }
    },
    onPrev () {
      this.stopRotation();
      if (this.currentIdx === 0) {
        // 첫번째
        this.currentIdx = this.getPhotoList.length - 1;
      } else {
        this.currentIdx--;
      }
      this.startRotation();
    },
    onNext () {
      this.stopRotation();
      if (this.currentIdx === this.getPhotoList.length - 1) {
        // 마지막
        this.currentIdx = 0;
      } else {
        this.currentIdx++;
      }
      this.startRotation();
    }
  }
}
</script>