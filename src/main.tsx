import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '@/store';
import App from '@/App.tsx';
import Cart from '@/pages/Cart';
import Movie from '@/pages/Movie.tsx';

// tailwindcss
import '@/assets/main.css';
import '@/assets/styles.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<Navigate replace to="/" />} />
					<Route path="" Component={App} />
					<Route path="movie/:movie_id" Component={Movie} />
					<Route path="cart" Component={Cart} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
