import axiosClient from "./axiosClient";

const TenantApi = {
  async addTenant(data) {
    const url = `/tenant-manager/add-tenant`;
    return axiosClient.post(url, data);
  },

}

export default TenantApi