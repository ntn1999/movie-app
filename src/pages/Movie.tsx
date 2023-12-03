import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '@/store';
import { setMovie } from '@/store/app.reducer';
import axiosClient from '@/api/axios.client';
import { Button, Tag } from '@/components/atoms';
import CatchError from '@/errors/catch.error';
import { CharactorInfo } from '@/components/molecules';

function Movie() {
	const { movie } = useSelector((state: RootState) => state.app);
	const { movie_id } = useParams<string>();
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axiosClient.get(`/movie/${movie_id}`, {
					params: {
						// get actors information
						append_to_response: 'credits',
					},
				});

				dispatch(setMovie(data));
			} catch (err: unknown) {
				const { message } = new CatchError(err);
				window.alert(message);
			}
		})();

		return () => {
			// Delete all state of the movie (in case movie details are cached)
			// const defaultMovie = {} as TMovie;
			// dispatch(setMovie(defaultMovie));
		};
	}, []);

	return (
		<>
			<section className="movie-detail">
				<div className="movie-detail__left">
					<img src={import.meta.env.VITE_PREFIX_IMAGE + movie.poster_path} alt={movie.title} />
					<Button text="Buy now" size="lg" width="80" />
				</div>
				<div className="movie-detail__right">
					<article
						className="movie-detail__right-background-image"
						style={{ backgroundImage: `url(${import.meta.env.VITE_PREFIX_IMAGE + movie.backdrop_path})` }}
					></article>
					<div className="movie-detail__right-title">{movie.original_title}</div>
					<div className="movie-detail__right-rating">
						<span className="imdb">IMDB</span>
						<span className="vote">{movie.vote_average}</span>
					</div>
					<span className="movie-detail__right-category">
						{movie.genres?.map((genre, index: number) => (
							<div key={index} className="tags">
								<Tag name={genre.name} />
							</div>
						))}
					</span>
					<div className="movie-detail__right-description">
						<div className="title">Overview</div>
						<div className="overview">{movie.overview}</div>
					</div>
					<table className="movie-detail__right-crew" cellSpacing={0} cellPadding={0}>
						<tbody>
							<tr>
								<td>Director</td>
								<td>HEHE</td>
							</tr>
							<tr>
								<td>Writer</td>
								<td>HAHA</td>
							</tr>
							<tr>
								<td>Country</td>
								<td>{movie.production_countries?.map((country) => country.name)}</td>
							</tr>
							<tr>
								<td>Release</td>
								<td>{movie.release_date}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<div className="cast-information">
				<div>Top Billed Cast</div>
				<div className="cast-information__character">
					{movie.credits?.cast
						.map((cast: ICast, index: number) => (
							<span key={index}>
								<CharactorInfo name={cast.name} character={cast.character} profile_path={cast.profile_path} />
							</span>
						))
						.slice(0, 15)}
				</div>
			</div>
		</>
	);
}

export default Movie;
