import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BotResponse {
  id: string;
  keyword: string;
  response: string;
}

interface BotState {
  responses: BotResponse[];
}

const initialState: BotState = {
  responses: [],
};

const botSlice = createSlice({
  name: 'bot',
  initialState,
  reducers: {
    addResponse: (state, action: PayloadAction<BotResponse>) => {
      state.responses.push(action.payload);
    },
    editResponse: (state, action: PayloadAction<BotResponse>) => {
      const index = state.responses.findIndex(response => response.id === action.payload.id);
      if (index !== -1) {
        state.responses[index] = action.payload;
      }
    },
    deleteResponse: (state, action: PayloadAction<string>) => {
      state.responses = state.responses.filter(response => response.id !== action.payload);
    },
  },
});

export const { addResponse, editResponse, deleteResponse } = botSlice.actions;
export default botSlice.reducer;