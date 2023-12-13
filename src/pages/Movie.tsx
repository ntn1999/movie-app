import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';

import axiosClient from '@/api/axios.client';
import { RootState } from '@/store';
import { Button, Badge, Trailers } from '@/components/atoms';
import { CharacterInfo } from '@/components/molecules';
import { SagaActions } from '@/enums/saga.enum';
import { scrollToTop } from '@/utils';

function Movie() {
	const [videoKey, setVideoKey] = useState<string>();
	const dispatch = useDispatch();
	const { movie_id } = useParams<string>();
	const { movieDetail } = useSelector((state: RootState) => state.movie);
	const director: TCrew | undefined = movieDetail.credits?.crew.find((crew: TCrew) => crew.job === 'Producer');
	const writer: TCrew | undefined = movieDetail.credits?.crew.find((crew: TCrew) => crew.job === 'Writer');
	const country = movieDetail.production_countries
		?.map((country) => country.name)
		.toString()
		.split(` , `);

	useEffect(() => {
		scrollToTop();
		dispatch({ type: SagaActions.GET_DETAIL_MOVIE_BY_ID, payload: movie_id });

		(async () => {
			try {
				const response: AxiosResponse<TResponseMovieVideos> = await axiosClient.get(
					`/movie/${movie_id}/videos`,
				);
				const { results } = response.data;
				const [firstTrailer] = results;

				setVideoKey(firstTrailer.key);
			} catch (err: unknown) {
				if (err instanceof AxiosError) {
					window.alert(err.message);
				}
			}
		})();
	}, []);

	const handleAddToCart = async () => {
		dispatch({ type: SagaActions.ADD_MOVIE_BY_ID, payload: movie_id });
	};

	return (
		<>
			<section className="movie-detail">
				<div className="movie-detail__left">
					<img
						src={import.meta.env.VITE_PREFIX_IMAGE + movieDetail.poster_path}
						alt={movieDetail.title}
						className="min-h-[30rem]"
					/>
					<Button text="Buy now" width={10} onClick={handleAddToCart} />
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
						<span className="imdb">IMDB</span>
						<span className="vote">{movieDetail.vote_average}</span>
					</div>
					<span className="movie-detail__right-category">
						{movieDetail.genres?.map((genre: TGenres, index: number) => (
							<div key={index} className="tags">
								<Badge text={genre.name} />
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
								<td>{director?.name}</td>
							</tr>
							<tr>
								<td>Writer</td>
								<td>{writer?.name}</td>
							</tr>
							<tr>
								<td>Country</td>
								<td>{country}</td>
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
				<div className="cast-information__title">Top Billed Cast</div>
				<div className="cast-information__character">
					{movieDetail.credits?.cast
						.map((cast: TCast, index: number) => (
							<span key={index}>
								<CharacterInfo
									name={cast.name}
									character={cast.character}
									profile_path={cast.profile_path}
								/>
							</span>
						))
						.slice(0, 10)}
				</div>
			</div>

			<Trailers videoKey={videoKey} />
		</>
	);
}

export default Movie;
