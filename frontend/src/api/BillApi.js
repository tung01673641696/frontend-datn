import axiosClient from "./axiosClient";

const BillApi = {
  async addBill(data) {
    const url = `/bill/add-bill`
    return axiosClient.post(url, data)
  },

  async getAllServiceBill(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const url = `/bill/get-all-service-bill?${query}`;
    return axiosClient.get(url);
  },

  async updateStatusBill(id) {
    const url = `/bill/update-bill/${id}`;
    return axiosClient.put(url);
  },

  async getDetailBill(id) {
    const url = `/bill/get-detail-bill/${id}`
    return axiosClient.get(url)
  },
}

export default BillApi