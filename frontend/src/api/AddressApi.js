import axiosClient from "./axiosClient";

const AddressApi = {
  async getAllDistrict() {
    const url = `/district/show-district`;
    return axiosClient.get(url)
  }
}

export default AddressApi