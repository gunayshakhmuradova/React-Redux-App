import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  keyword : '',
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    createDataFunc: (state, action) => {
      state.data = [...state.data, action.payload]
    },
    sortingDataFunc: (state, action) => {
      if (action.payload === "asc") {
        state.data.sort((a, b) => a.price - b.price);
      } else if (action.payload === "desc") {
        state.data.sort((a, b) => b.price - a.price);
      }
    },
    
    deleteDataFunc: (state, action) => {
      state.data = [...state.data.filter(dt => dt.id != action.payload)]
    },
    updateDataFunc: (state, action) => {
      state.data = [...state.data.map(dt => dt.id == action.payload.id ?({...dt, ...action.payload}) : dt)]
    },
    searchDataFunc: (state, action) => {
      state.keyword = action.payload
    }
  },
});

export const { createDataFunc, deleteDataFunc, updateDataFunc, sortingDataFunc, searchDataFunc} = dataSlice.actions;

export default dataSlice.reducer;
