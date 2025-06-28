import axiosClient from "./axiosClient";

const ContractApi = {
  async createDepositContract(data) {
    const url = `/contract/create-deposit-contracts`
    return axiosClient.post(url, data)
  },

  async getAllDepositContractByRenter(renterId) {
    const url = `/contract/all-deposit-contract-by-renter/renter/${renterId}`
    return axiosClient.get(url)
  },

  async getDepositContractDetail(renterId, roomId) {
    const url = `/contract/deposit-contract-detail/renter/${renterId}/room/${roomId}`;
    return axiosClient.get(url);
  },

  async cancelContract(contractId) {
    return axiosClient.put(`/contract/cancel/${contractId}`)
  },

  async confirmDepositContract(contractId) {
    return axiosClient.put(`/contract/confirm/${contractId}`)
  },

  async getAllDepositContractsByLandlord(landlordId) {
    const url = `/contract/landlord/${landlordId}/deposit-contracts`;
    return axiosClient.get(url);
  },

  async createContract(data) {
    const url = `/contract/create-contract`
    return axiosClient.post(url, data)
  },

  async landlordGetAllDepositContract(landlordId) {
    const url = `/contract/manager-contract/landlord-get-all-deposit-contract/landlord/${landlordId}`;
    return axiosClient.get(url);
  },

  async landlordGetAllContract(landlordId) {
    const url = `/contract/manager-contract/landlord-get-all-contract/landlord/${landlordId}`;
    return axiosClient.get(url);
  },

  async getRentalContractDetail(roomId) {
    const url = `/contract/rental-contract-detail/room/${roomId}`;
    return axiosClient.get(url);
  },

  async tenantGetAllContract(tenantId) {
    const url = `/contract/get-all-rental-contract-by-tenant/tenant/${tenantId}`;
    return axiosClient.get(url);
  },

}

export default ContractApi