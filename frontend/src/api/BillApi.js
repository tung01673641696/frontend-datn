import axiosClient from "./axiosClient";

const BillApi = {
  async addBill(data) {
    const url = `/bill/add-bill`
    return axiosClient.post(url, data)
  },
}

export default BillApi