import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import Movie from './pages/Movie.tsx';
// tailwindcss
import './assets/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				{/* <Route path="*" element={<Navigate to="/home" />} /> */}
				<Route path="" Component={App} />
				<Route path="movie/:id" Component={Movie} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
);
