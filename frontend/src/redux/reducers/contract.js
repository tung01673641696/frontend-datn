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

export const confirmDepositContract = createAsyncThunk(
  "contract/confirmDepositContract",
  async (contractId, thunkAPI) => {
    try {
      const res = await ContractApi.confirmDepositContract(contractId);
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

export const createContract = createAsyncThunk(
  "contract/createContract",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ContractApi.createContract(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const landlordGetAllDepositContract = createAsyncThunk(
  "contract/landlordGetAllDepositContract",
  async (landlordId) => {
    const allDepositContract = await ContractApi.landlordGetAllDepositContract(landlordId);
    return allDepositContract;
  }
);

export const landlordGetAllContract = createAsyncThunk(
  "contract/landlordGetAllContract",
  async (landlordId) => {
    const landlordGetAllContract = await ContractApi.landlordGetAllContract(landlordId);
    return landlordGetAllContract;
  }
);

export const getRentalContractDetail = createAsyncThunk(
  "contract/getRentalContractDetail",
  async (roomId) => {
    const rentalContractDetail = await ContractApi.getRentalContractDetail(roomId);
    return rentalContractDetail;
  }
);


const ContractSlice = createSlice({
  name: "contract",
  initialState: {
    allDepositContractByRenter: [],
    allDepositContractsByLandlord: [],
    depositContractDetail: {},
    isDepositContractExists: false,
    allDepositContract: [],
    allContract: [],
    rentalContractDetail: {}
  },
  extraReducers: builder => {
    builder
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

      .addCase(landlordGetAllDepositContract.fulfilled, (state, action) => {
        state.loading = false
        state.allDepositContract = action.payload.data.deposit_contract;
      })

      .addCase(landlordGetAllContract.fulfilled, (state, action) => {
        state.loading = false
        state.allContract = action.payload.data.contract;
      })

      .addCase(getRentalContractDetail.fulfilled, (state, action) => {
        state.loading = false
        state.rentalContractDetail = action.payload.data;
      })

  }
})

export default ContractSlice