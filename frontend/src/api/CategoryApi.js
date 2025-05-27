import axiosClient from "./axiosClient";

const CategoryApi = {
  async getAllCategory() {
    const url = `/category/show-category`;
    return axiosClient.get(url)
  }
}

export default CategoryApi