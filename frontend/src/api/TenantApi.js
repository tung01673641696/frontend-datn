import axiosClient from "./axiosClient";

const TenantApi = {
  async addTenant(data) {
    const url = `/tenant-manager/add-tenant`;
    return axiosClient.post(url, data);
  },

  async getAllTenant() {
    const url = `/tenant-manager/get-all-tenant`;
    return axiosClient.get(url);
  },

  async deleteTenant(tenantId) {
    const url = `/tenant-manager/delete-tenant/tenant_id/${tenantId}`;
    return axiosClient.delete(url);
  },

  async getOneTenant(tenantId) {
    const url = `/tenant-manager/get-one-tenant/tenant_id/${tenantId}`;
    return axiosClient.get(url);
  },

  async editTenant(tenantId, data) {
    const url = `/tenant-manager/edit-tenant/${tenantId}`;
    return axiosClient.put(url, data)
  },

  async getTenantByRoom(roomId) {
    const url = `/tenant-manager/get-tenant-by-room/room_id/${roomId}`
    return axiosClient.get(url)
  },

  async getDetailTenantByRoom(roomId) {
    const url = `/get-detail-tenant-by-room/room_id/${roomId}`;
    return axiosClient.get(url);
  },
}

export default TenantApi