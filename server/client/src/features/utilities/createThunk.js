import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createThunk = (name, apiEndPoint, method) => {
  return createAsyncThunk(name, async ({ data, token }, thunkAPI) => {
    try {
      let response;
      const config = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
      const base_URL = 'https://trello-jr.onrender.com';
      
      switch (method) {
        case 'GET':
          response = await axios.get(base_URL + apiEndPoint, { ...config, params: data });
          break;
        case 'POST':
          response = await axios.post(base_URL + apiEndPoint, data, config);
          break;
        case 'PUT':
          response = await axios.put(base_URL + apiEndPoint, data, config);
          break;
        case 'DELETE':
          response = await axios.delete(base_URL + apiEndPoint, data ? { ...config, data } : config);
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