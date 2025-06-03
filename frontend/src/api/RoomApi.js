import axiosClient from "./axiosClient";

const RoomApi = {
  async getRoomByHouse(id) {
    const url = `/room-manager/show-room/house_id/${id}`;
    return axiosClient.get(url);
  },

  async addRoom(data) {
    const url = `/room-manager/add-room`;
    return axiosClient.post(url, data);
  },

  async deleteRoom(roomId) {
    const url = `/room-manager/delete-room/room_id/${roomId}`
    return axiosClient.delete(url)
  },

  async getOneRoom(roomId) {
    const url = `/room-manager/get-one-room/room_id/${roomId}`
    return axiosClient.get(url)
  },

  async editRoom(roomId, data) {
    const url = `/room-manager/edit-room/${roomId}`
    return axiosClient.put(url, data)
  },
}

export default RoomApi