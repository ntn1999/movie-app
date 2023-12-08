import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { RootState } from '@/store';
import { setMovieDetail } from '@/store/movie.reducer';
import axiosClient from '@/api/axios.client';
import { Button, Badge, Character } from '@/components/atoms';
import CatchError from '@/errors/catch.error';

function Movie() {
	const dispatch = useDispatch();
	const { movie_id } = useParams<string>();
	const { movieDetail } = useSelector((state: RootState) => state.movie);

	useEffect(() => {
		(async () => {
			try {
				const response: AxiosResponse<TMovieDetail> = await axiosClient.get(`/movie/${movie_id}`, {
					params: {
						// get actors information
						append_to_response: 'credits',
					},
				});

				dispatch(setMovieDetail(response.data));
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
					<img
						src={import.meta.env.VITE_PREFIX_IMAGE + movieDetail.poster_path}
						alt={movieDetail.title}
						className="min-h-[30rem]"
					/>
					<Button text="Buy now" width={80} />
				</div>
				<div className="movie-detail__right">
					<article
						className="movie-detail__right-background-image"
						style={{
							backgroundImage: `url(${import.meta.env.VITE_PREFIX_IMAGE + movieDetail.backdrop_path})`,
						}}
					></article>
					<div className="movie-detail__right-title">{movieDetail.original_title}</div>
					<div className="movie-detail__right-rating">
						<Badge name="IMDB" color={'amber'} width={4} height={2} />
						<span className="imdb">IMDB</span>
						<span className="vote">{movieDetail.vote_average}</span>
					</div>
					<span className="movie-detail__right-category">
						{movieDetail.genres?.map((genre, index: number) => (
							<div key={index} className="tags">
								<Badge name={genre.name} />
							</div>
						))}
					</span>
					<div className="movie-detail__right-description">
						<div className="title">Overview</div>
						<div className="overview">{movieDetail.overview}</div>
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
								<td>{movieDetail.production_countries?.map((country) => country.name)}</td>
							</tr>
							<tr>
								<td>Release</td>
								<td>{movieDetail.release_date}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<div className="cast-information">
				<div>Top Billed Cast</div>
				<div className="cast-information__character">
					{movieDetail.credits?.cast
						.map((cast: TCast, index: number) => (
							<span key={index}>
								<Character
									name={cast.name}
									character={cast.character}
									profile_path={cast.profile_path}
								/>
							</span>
						))
						.slice(0, 15)}
				</div>
			</div>
		</>
	);
}

export default Movie;
