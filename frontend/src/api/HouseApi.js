import axiosClient from "./axiosClient";

const HouseApi = {
  async getHouseByOwner(id) {
    const url = `/house-manager/show-house/user/${id}`
    return axiosClient.get(url)
  },

  async addHouse(data) {
    const url = `house-manager/add-house`
    return axiosClient.post(url, data)
  }
}

export default HouseApi