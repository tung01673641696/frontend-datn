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

  async getPostsByOnePeople(peopleId, status) {
    const url = `/posts/get-posts-by-one-people/people_id/${peopleId}`;
    return axiosClient.get(url, { params: { status: status } });
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

  async adminApprovePost(postId) {
    const url = `/admin/approve-posts/${postId}`;
    return axiosClient.put(url);
  },

  async adminRejectPost(postId) {
    const url = `/admin/reject-posts/${postId}`;
    return axiosClient.put(url);
  },

  async getAllPostsByAllCustomerActive() {
    const url = `/get-all-posts-by-all-customer-active`
    return axiosClient.get(url)
  },

  async getAllPostsByAllLandlordActive() {
    const url = `/get-all-posts-by-all-landlord-active`
    return axiosClient.get(url)
  },

  async getAllPostsByAllLandlord() {
    const url = `/admin/get-all-posts-by-all-landlord`
    return axiosClient.get(url)
  },

  async getAllPostsByAllLandlordActiveByDistrict(districtId) {
    const url = `/get-all-posts-by-all-landlord-active-by-district/district_id/${districtId}`
    return axiosClient.get(url)
  },

}

export default PostsApi