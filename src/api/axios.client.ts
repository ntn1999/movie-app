import axios from 'axios';

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_TMDB_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
	},
});

export default axiosClient;
