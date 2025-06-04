import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import ContractApi from "../../api/ContractApi";
import { toast } from "react-toastify";

export const createDepositContract = createAsyncThunk(
  "contract/createDepositContract",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ContractApi.createDepositContract(data);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      }
      throw error;
    }
  }
);

const ContractSlice = createSlice({
  name: "contract",
  initialState: {

  },

})

export default ContractSlice