import axiosClient from "./axiosClient";

const RentalRequestApi = {
  async rentalRequest(userId, roomId) {
    const url = `/rental_request/user_id/${userId}/room_id/${roomId}`
    return axiosClient.post(url)
  },

  async getAllRentalRequest(userId) {
    const url = `/all-rental-request/user_id/${userId}`
    return axiosClient.get(url)
  },

  async RejectRentalRequest(id) {
    const url = `/rental-requests/${id}/reject`
    return axiosClient.put(url)
  },

  async ApproveRentalRequest(id) {
    const url = `/rental-requests/${id}/approve`;
    return axiosClient.put(url);
  }
}

export default RentalRequestApi