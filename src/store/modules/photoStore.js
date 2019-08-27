export default {
  state: {
    photoList: [
      {
        "id": 1,
        "title": "사진 1",
        "imageUrl": "https://picsum.photos/id/1/400/300"
      },
      {
        "id": 2,
        "title": "사진 2",
        "imageUrl": "https://picsum.photos/id/2/400/300"
      },
      {
        "id": 3,
        "title": "사진 3",
        "imageUrl": "https://picsum.photos/id/3/400/300"
      },
      {
        "id": 4,
        "title": "사진 4",
        "imageUrl": "https://picsum.photos/id/4/400/300"
      },
      {
        "id": 5,
        "title": "사진 5",
        "imageUrl": "https://picsum.photos/id/5/400/300"
      }
    ]
  },
  mutations: {
    deletePhoto (state, data) {
      state.photoList.splice(data, 1);
    }
  },
  actions: {
    deletePhoto ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        let findIndex = state.photoList.findIndex(i => i.id === data);
        if (findIndex !== -1) {
          // 삭제
          commit('deletePhoto', findIndex);
          resolve();
        } else {
          // 삭제 X
          reject();
        }
      })
    }
  },
  getters: {
    getPhotoList (state) {
      return state.photoList
    }
  }
}