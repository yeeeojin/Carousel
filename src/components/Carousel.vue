<template>
  <div class="carousel">
    <h3>Carousel</h3>
    <!-- rt: 왼쪽으로 슬라이딩 / lt: 오른쪽으로 슬라이딩 -->
    <transition-group tag="ul" :class="['img-slider', isRt ? 'rt' : 'lt']" name="slide">
      <li v-for="number in [currentIdx]" :key="number">
        <img :src="getPhotoList[Math.abs(currentIdx) % getPhotoList.length].imageUrl" />
      </li>
    </transition-group>

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
      isRt: true,
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
      this.isRt = false;
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
      this.isRt = true;
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