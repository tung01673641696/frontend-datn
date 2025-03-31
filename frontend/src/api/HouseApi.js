import axiosClient from "./axiosClient";

const HouseApi = {
  async getHouseByOwner(id) {
    const url = `/house-manager/show-house/user/${id}`
    return axiosClient.get(url)
  },

  async getOneHouse(houseId) {
    const url = `/house-manager/get-one-house/${houseId}`
    return axiosClient.get(url)
  },

  async addHouse(data) {
    const url = `/house-manager/add-house`
    return axiosClient.post(url, data)
  },

  async deleteHouse(houseId) {
    const url = `/house-manager/delete-house/house_id/${houseId}`
    return axiosClient.delete(url)
  }
}

export default HouseApi