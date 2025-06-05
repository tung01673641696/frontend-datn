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

export const getAllDepositContractByRenter = createAsyncThunk("contract/getAllDepositContractByRenter", async (renterId) => {
  const allDepositContractByRenter = await ContractApi.getAllDepositContractByRenter(renterId);
  return allDepositContractByRenter;
});

export const getDepositContractDetail = createAsyncThunk(
  "contract/getDepositContractDetail",
  async ({ renterId, roomId }) => {
    const depositContractDetail = await ContractApi.getDepositContractDetail(renterId, roomId);
    return depositContractDetail;
  }
);

export const cancelDepositContract = createAsyncThunk(
  "contract/cancelDepositContract",
  async (contractId, thunkAPI) => {
    try {
      const res = await ContractApi.cancelContract(contractId);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getAllDepositContractsByLandlord = createAsyncThunk(
  "contract/getAllDepositContractsByLandlord",
  async (landlordId) => {
    const allDepositContractsByLandlord = await ContractApi.getAllDepositContractsByLandlord(landlordId);
    return allDepositContractsByLandlord;
  }
);


const ContractSlice = createSlice({
  name: "contract",
  initialState: {
    allDepositContractByRenter: [],
    allDepositContractsByLandlord: [],
    depositContractDetail: {},
    isDepositContractExists: false,
  },
  extraReducers: builder => {
    builder
      .addCase(getAllDepositContractByRenter.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getAllDepositContractByRenter.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getAllDepositContractByRenter.fulfilled, (state, action) => {
        state.loading = false
        state.allDepositContractByRenter = action.payload.data.deposit_contracts;
      })

      .addCase(getDepositContractDetail.fulfilled, (state, action) => {
        state.depositContractDetail = action.payload.data;
      })

      .addCase(getAllDepositContractsByLandlord.fulfilled, (state, action) => {
        state.loading = false
        state.allDepositContractsByLandlord = action.payload.data.deposit_contracts;
      })

  }
})

export default ContractSlice