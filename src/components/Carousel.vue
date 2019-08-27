<template>
  <div>
    <h3>Carousel</h3>
    <div class="slide">
      <ul class="list">
        <transition-group name="list" tag="li">
          <img v-for="photo in getPhotoList" :key="photo.id" class="list-item" :src="photo.imageUrl">
        </transition-group>
      </ul>
    </div>
      <button class="button-prev" @click="onPrev">{{ lt }}</button>
        <span>사진 1</span>
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
      items: [1,2,3,4,5,6,7,8,9],
      nextNum: 10,
      deleteNum: null
      // currentNumber: 0,
      // timer: null
    }
  },
  computed: {
    ...mapGetters(['getPhotoList'])
  },
  methods: {
    // startRotation: function() {
    //   this.timer = setInterval(this.next, 3000);
    // },
    // stopRotation: function() {
    //   clearTimeout(this.timer);
    //   this.timer = null;
    // },
    onPrev () {
      console.log('클릭', this.getPhotoList);
    },
    onNext () {
      console.log('클릭2');
    },
    add () {
      if (this.deleteNum !== null) {
        this.items.splice(Number(this.deleteNum), 0, this.nextNum++);
      } else {
        alert('삭제할 id를 입력하세요');
      }
    },
    remove () {
      if (this.deleteNum !== null) {
        this.items.splice(Number(this.deleteNum), 1);
      } else {
        alert('삭제할 id를 입력하세요2');
      }
    }
  }
}
</script>