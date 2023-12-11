import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '@/store';
import { Button, Badge, Trailers } from '@/components/atoms';
import { CharacterInfo } from '@/components/molecules';
import { SagaActions } from '@/enums/saga.enum';

function Movie() {
	const dispatch = useDispatch();
	const { movie_id } = useParams<string>();
	const { movieDetail, oneMovieVideoKey } = useSelector((state: RootState) => state.movie);

	useEffect(() => {
		dispatch({ type: SagaActions.GET_DETAIL_MOVIE_BY_ID, payload: movie_id });
		dispatch({ type: SagaActions.GET_VIDEO_MOVIE_BY_ID, payload: movie_id });
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
								<CharacterInfo
									name={cast.name}
									character={cast.character}
									profile_path={cast.profile_path}
								/>
							</span>
						))
						.slice(0, 15)}
				</div>
			</div>

			<Trailers videoKey={oneMovieVideoKey} />
		</>
	);
}

export default Movie;
