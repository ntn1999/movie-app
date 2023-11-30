import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App.tsx';
import Movie from './pages/Movie.tsx';
// tailwindcss
import './assets/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					{/* <Route path="*" element={<Navigate to="/home" />} /> */}
					<Route path="" Component={App} />
					<Route path="movie/:movieId" Component={Movie} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
