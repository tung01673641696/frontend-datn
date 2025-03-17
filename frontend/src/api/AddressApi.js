import { getWard } from "../redux/reducers/address";
import axiosClient from "./axiosClient";

const AddressApi = {
  async getAllDistrict() {
    const url = `/district/show-district`;
    return axiosClient.get(url)
  },

  async getWard(id) {
    const url = `ward/show-ward/${id}`;
    return axiosClient.get(url)
  }
}

export default AddressApi