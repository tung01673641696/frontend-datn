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

  async landlordGetAllPost(landlordId, status) {
    const url = `/posts/landlord-get-all-post/landlord_id/${landlordId}`;
    return axiosClient.get(url, { params: { status: status } });
  },

  async tenantGetAllPost(tenantId, status) {
    const url = `/posts/tenant-get-all-post/tenant_id/${tenantId}`;
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