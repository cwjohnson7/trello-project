import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createThunk = (name, apiEndPoint, method) => {
  return createAsyncThunk(name, async (data, thunkAPI) => {
    try {
      let response;

      switch (method) {
        case 'GET':
          response = await axios.get(apiEndPoint, data);
          break;
        case 'POST':
          response = await axios.post(apiEndPoint, data);
          break;
        case 'PUT':
          response = await axios.put(apiEndPoint, data);
          break;
        case 'DELETE':
          response = await axios.delete(apiEndPoint);
          break;
        default:
          throw new Error('Invalid method');
      }

      return response.data;
    } catch (err) {
      const errorData = {
        message: err.response?.data?.message || err.message,
        status: err.response?.status,
      };
      return thunkAPI.rejectWithValue(errorData);
    }
  });
};

export default createThunk;