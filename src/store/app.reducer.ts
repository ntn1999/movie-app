import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppStateType = {
	inputValue: '',
	status: 'Todo',
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setInputValue: (state, action: PayloadAction<string>) => {
			state.inputValue = action.payload;
		},
	},
});

export const { setInputValue } = appSlice.actions;

export default appSlice.reducer;
