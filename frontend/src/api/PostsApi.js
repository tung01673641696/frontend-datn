import axiosClient from "./axiosClient";

const PostsApi = {
  async addPostsByCustomer(data) {
    const url = `/posts/add-posts-by-customer`;
    return axiosClient.post(url, data);
  },

  // async getRoomByHouse(id) {
  //   const url = `/room-manager/show-room/house_id/${id}`;
  //   return axiosClient.get(url);
  // },

  // async deleteRoom(roomId) {
  //   const url = `/room-manager/delete-room/room_id/${roomId}`
  //   return axiosClient.delete(url)
  // },

  // async getOneRoom(roomId) {
  //   const url = `/room-manager/get-one-room/room_id/${roomId}`
  //   return axiosClient.get(url)
  // },

  // async editRoom(roomId, data) {
  //   const url = `/room-manager/edit-room/${roomId}`
  //   return axiosClient.put(url, data)
  // }
}

export default PostsApi