import { configureStore } from '@reduxjs/toolkit';
import appReducer from '@/store/app.reducer';

const store = configureStore({
	reducer: {
		app: appReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
