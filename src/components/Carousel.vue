<template>
  <div class="carousel">
    <h3>Carousel</h3>
    <!-- photoList가 0이면 화면에 안 보여짐 -->
    <div v-if="getPhotoList.length > 0">
      <!-- rt: 왼쪽으로 슬라이딩 / lt: 오른쪽으로 슬라이딩 -->
      <transition-group tag="ul" :class="['img-slider', isRt ? 'rt' : 'lt']" name="slide" :duration="slideTimer">
        <li v-for="number in [currentIdx]" :key="number">
          <img :src="getPhotoList[Math.abs(currentIdx) % getPhotoList.length].imageUrl" />
        </li>
      </transition-group>
      <button class="button-prev" @click="onPrev">{{ lt }}</button>
      <span>{{ getPhotoList[currentIdx].title }}</span>
      <button class="button-next" @click="onNext">{{ rt }}</button>
    </div>
    <h3>이미지 삭제</h3>
    <div>
      <label>
        id: <input type="text" v-model="deleteNum" @keyup.enter="onDelete">
      </label>
      <button @click="onDelete">삭제</button>
    </div>
  </div>
</template>

<script>
// store
import { mapGetters, mapActions } from 'vuex'

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
    this.startInterval();
  },
  methods: {
    ...mapActions(['deletePhoto']),
    startInterval () {
      this.timer = setInterval(() => {
        this.changeImage();
      }, this.slideTimer);
    },
    stopInterval () {
      clearInterval(this.timer);
      this.timer = null;
    },
    changeImage () {
      if (this.isRt) {
        // >
        if (this.currentIdx === this.getPhotoList.length - 1) {
          // 마지막
          this.currentIdx = 0;
        } else {
          this.currentIdx++;
        }
      } else {
        // <
        if (this.currentIdx === 0) {
          // 첫번째
          this.currentIdx = this.getPhotoList.length - 1;
        } else {
          this.currentIdx--;
        }
      }
      if (this.currentIdx >= this.getPhotoList.length) {
        this.currentIdx = 0;
      }
    },
    onPrev () {
      // <
      this.stopInterval();
      this.isRt = false;
      if (this.currentIdx === 0) {
        // 첫번째
        this.currentIdx = this.getPhotoList.length - 1;
      } else {
        this.currentIdx--;
      }
      this.startInterval();
    },
    onNext () {
      // >
      this.stopInterval();
      this.isRt = true;
      if (this.currentIdx === this.getPhotoList.length - 1) {
        // 마지막
        this.currentIdx = 0;
      } else {
        this.currentIdx++;
      }
      this.startInterval();
    },
    onDelete () {
      let num = this.deleteNum;
      // id 입력칸 초기화
      this.deleteNum = null;

      // 입력값이 빈 값이면 리턴
      // 입력값이 Number가 아니면 리턴
      if (!num || !Number(num)) {
        return
      }

      this.stopInterval();
      this.deletePhoto(Number(num))
      .then(() => {
        // 이미지 삭제 성공
        alert('이미지를 삭제하였습니다.');
      })
      .catch(() => {
        // 이미지 삭제 가능한 id 아님
        alert('존재하지 않는 id입니다. 다시 확인 부탁드립니다.');
      })
      .finally(()=> {
        this.startInterval();
      });
    }
  }
}
</script>