import axiosClient from "./axiosClient";

const HouseApi = {
  async getHouseByOwner(id) {
    const url = `/house-manager/show-house/user/${id}`
    return axiosClient.get(url)
  }
}

export default HouseApi