import axiosClient from "./axiosClient";

const RoomApi = {
  async getRoomByHouse(id) {
    const url = `/room-manager/show-room/house_id/${id}`;
    return axiosClient.get(url);
  },
}

export default RoomApi