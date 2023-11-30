import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '@/store';
import axiosClient from '@/api/axios.client';
import { setMovie } from '@/store/app.reducer';

function Movie() {
	const { movie } = useSelector((state: RootState) => state.app);
	const { movie_id } = useParams<string>();
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axiosClient.get(`/movie/${movie_id}`, {
					params: {
						append_to_response: 'credits',
					},
				});

				dispatch(setMovie(data));
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	return (
		<>
			<div id="movie__detail">
				<div className="w-screen h-1/2">
					<h1>Movie detail {movie.original_language}</h1>
				</div>
			</div>
		</>
	);
}

export default Movie;
