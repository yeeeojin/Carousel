<template>
  <div>
    <h3>Carousel</h3>
    <div class="carousel">
      <ul>
        <li><img src="https://picsum.photos/id/1/400/300"></li>
      </ul>
      <button class="button-prev">{{ lt }}</button>
      <span>사진 1</span>
      <button class="button-next">{{ rt }}</button>
    </div>

    <h3>이미지 삭제</h3>
    <div>
      <label>
        id: <input type="text">
      </label>
      <button>삭제</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      lt: '<',
      rt: '>'
    }
  }
}
</script>