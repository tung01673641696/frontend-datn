import axiosClient from "./axiosClient";

const VehicleApi = {
  async addVehicle(data) {
    const url = `/vehicle-manager/add-vehicle`;
    return axiosClient.post(url, data);
  },

  async getAllVehicle() {
    const url = `/vehicle-manager/get-all-vehicle`;
    return axiosClient.get(url);
  },

  async deleteVehicle(vehicleId) {
    const url = `/vehicle-manager/delete-vehicle/vehicle_id/${vehicleId}`;
    return axiosClient.delete(url);
  },

  async getOneVehicle(vehicleId) {
    const url = `/vehicle-manager/get-one-vehicle/vehicle_id/${vehicleId}`;
    return axiosClient.get(url);
  },

  async editVehicle(vehicleId, data) {
    const url = `/vehicle-manager/edit-vehicle/${vehicleId}`;
    return axiosClient.put(url, data)
  },
}

export default VehicleApi