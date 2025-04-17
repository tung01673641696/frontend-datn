import axiosClient from "./axiosClient";

const PostsApi = {
  async addPostsByCustomer(data) {
    const url = `/posts/add-posts-by-customer`;
    return axiosClient.post(url, data);
  },

  async addPostsByLandlord(data) {
    const url = `/posts/add-posts-by-landlord`;
    return axiosClient.post(url, data);
  },

  async getPostsByOneCustomer(customerId) {
    const url = `/posts/get-posts-by-one-customer/customer_id/${customerId}`;
    return axiosClient.get(url);
  },

    async getOnePostsByCustomer(postId) {
    const url = `/posts/get-one-posts-by-customer/posts_id/${postId}`
    return axiosClient.get(url)
  },

    async editPostsByCustomer(postId, data) {
    const url = `/posts/edit-posts-by-customer/posts_id/${postId}`
    return axiosClient.put(url, data)
  }

  // async deleteRoom(roomId) {
  //   const url = `/room-manager/delete-room/room_id/${roomId}`
  //   return axiosClient.delete(url)
  // },

}

export default PostsApi