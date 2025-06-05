import axiosClient from "./axiosClient";

const ContractApi = {
  async createDepositContract(data) {
    const url = `/contract/create-deposit-contracts`
    return axiosClient.post(url, data)
  },

  async getAllDepositContractByRenter(renterId) {
    const url = `/contract/all-deposit-contract/renter/${renterId}`
    return axiosClient.get(url)
  },

  async getDepositContractDetail(renterId, roomId) {
    const url = `/contract/deposit-contract-detail/renter/${renterId}/room/${roomId}`;
    return axiosClient.get(url);
  },

  cancelContract(contractId) {
    return axiosClient.put(`/contract/cancel/${contractId}`)
  },

  async getAllDepositContractsByLandlord(landlordId) {
    const url = `/contract/landlord/${landlordId}/deposit-contracts`;
    return axiosClient.get(url);
  },

}

export default ContractApi