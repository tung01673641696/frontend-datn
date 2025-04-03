import axiosClient from "./axiosClient";

const TenantApi = {
  async addTenant(data) {
    const url = `/tenant-manager/add-tenant`;
    return axiosClient.post(url, data);
  },

  async getAllTenant() {
    const url = `/tenant-manager/get-all-tenant`;
    return axiosClient.get(url);
  }

}

export default TenantApi