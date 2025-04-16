import axiosClient from "./axiosClient";

const UserApi = {
  async register(data) {
    const url = `user/register`;
    return axiosClient.post(url, data);
  },

  async login(data) {
    const url = `user/login`;
    return axiosClient.post(url, data);
  },

  async getAllUser() {
    const url = `/user/get-all-user`;
    return axiosClient.get(url)
  },

  async deleteUser(userId) {
    const url = `/user/delete-user/user_id/${userId}`
    return axiosClient.delete(url)
  }
}

export default UserApi