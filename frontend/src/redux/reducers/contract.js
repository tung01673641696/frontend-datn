import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import ContractApi from "../../api/ContractApi";
import { toast } from "react-toastify";

export const createDepositContract = createAsyncThunk("contract/createDepositContract", async (data) => {
  const createDepositContract = await ContractApi.createDepositContract(data);
  return createDepositContract
})

const ContractSlice = createSlice({
  name: "contract",
  initialState: {

  },

})

export default ContractSlice