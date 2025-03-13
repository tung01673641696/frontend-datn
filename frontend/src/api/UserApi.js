import axiosClient from "./axiosClient";

const UserApi = {
  async checkPhone(phone) {
    const url = `user/check-phone`;
    return axiosClient.post(url, phone);
  },
  async login(data) {
    const url = `user/login`;
    return axiosClient.post(url, data);
  }
}

export default UserApi