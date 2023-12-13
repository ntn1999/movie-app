import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const listMovies = [] as TListMovies;
const movie = {} as TMovie;
const movieDetail = {} as TMovieDetail; // when include "credits"
const listMovieByGenres = [] as TMovieGenres[];

export const movieSlice = createSlice({
	name: 'movie',
	initialState: {
		/**
		 * FOR DISPLAY
		 */
		listMovies,
		movie,
		movieDetail,
		oneMovieVideoKey: '',

		listMovieByGenres,
	},
	reducers: {
		/**
		 * FOR DISPLAY
		 */
		setListMovies: (state, action: PayloadAction<TListMovies>) => {
			state.listMovies = action.payload;
		},
		setMovie: (state, action: PayloadAction<TMovie>) => {
			state.movie = action.payload;
		},
		setMovieDetail: (state, action: PayloadAction<TMovieDetail>) => {
			state.movieDetail = action.payload;
		},
		setListMovieByGenres: (state, action: PayloadAction<TMovieGenres[]>) => {
			state.listMovieByGenres = action.payload;
		},
		setOneMovieVideoKey: (state, action: PayloadAction<string>) => {
			state.oneMovieVideoKey = action.payload;
		},

		// CUSTOM ACTIONS...
		setMovieIsInCartById: (state, action: PayloadAction<number>) => {
			state.listMovieByGenres.forEach((movieGenre: TMovieGenres) => {
				// for in `movies`
				movieGenre.movies.forEach((movie: TMovie) => {
					if (movie.id === action.payload) movie.isInCart = true;
					else return;
				});
			});
		},
	},
});

export const {
	/**
	 * FOR DISPLAY
	 */
	setListMovies,
	setMovie,
	setMovieDetail,
	setListMovieByGenres,
	setOneMovieVideoKey,

	// CUSTOM ACTIONS...
	setMovieIsInCartById,
} = movieSlice.actions;

export default movieSlice.reducer;
