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

  async getPostsByOneCustomer(customerId, status) {
    const url = `/posts/get-posts-by-one-customer/customer_id/${customerId}`;
    return axiosClient.get(url, {params: {status:status}});
  },

  async getOnePostsByCustomer(postId) {
    const url = `/posts/get-one-posts-by-customer/posts_id/${postId}`
    return axiosClient.get(url)
  },

  async editPostsByCustomer(postId, data) {
    const url = `/posts/edit-posts-by-customer/posts_id/${postId}`
    return axiosClient.put(url, data)
  },

  async deletePostsByCustomer(postId) {
    const url = `/posts/delete-posts-by-customer/posts_id/${postId}`
    return axiosClient.delete(url)
  },

  async getAllPostsByAllCustomer() {
    const url = `/admin/get-all-posts-by-all-customer`
    return axiosClient.get(url)
  },

  async adminApprovePostCustomer(postId) {
    const url = `/admin/approve-posts-by-customer/${postId}`;
    return axiosClient.put(url);
  },

  async adminRejectPostCustomer(postId) {
    const url = `/admin/reject-posts-by-customer/${postId}`;
    return axiosClient.put(url);
  }

}

export default PostsApi