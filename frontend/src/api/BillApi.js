import axiosClient from "./axiosClient";

const BillApi = {
  async addBill(data) {
    const url = `/bill/add-bill`
    return axiosClient.post(url, data)
  },

  async getAllServiceBill(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `/bill/get-all-service-bill?${queryString}`;
    return axiosClient.get(url);
  }
}

export default BillApi