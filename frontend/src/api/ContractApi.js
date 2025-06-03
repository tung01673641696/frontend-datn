import axiosClient from "./axiosClient";

const ContractApi = {
  async createDepositContract(data) {
    const url = `/contract/create-deposit-contracts`
    return axiosClient.post(url, data)
  },
}

export default ContractApi