type TCast = {
	adult: false;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
};

type TCrew = {
	adult: boolean;
	credit_id: string;
	department: string;
	gender: number;
	id: number;
	job: string;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
};

type TPerson = {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	known_for: TMovieDetail[];
};

type TMovieDetail = {
	isInCart: boolean;
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: {
		id: number;
		name: string;
		poster_path: string;
		backdrop_path: string;
	};
	budget: number;
	genres: TGenres[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: [];
	production_countries: [
		{
			iso_3166_1: string;
			name: string;
		},
	];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: [];
	status: string;
	tagline: string;
	title: string;
	video: false;
	vote_average: number;
	vote_count: number;
	credits: {
		cast: TCast[];
		crew: TCrew[];
	};
};

type TMovie = {
	isInCart: boolean;
	id: number;
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

type TListMovies = TMovie[];

type TResponseListMovies = {
	page: number;
	results: TListMovies;
	total_pages: number;
	total_results: number;
};

type TResponseWatchlist = {
	success: boolean;
	status_code: 1 | 12 | 13; // 1 for the first time add movie | 12 is updated | 13 is deleted
	status_message: string;
};

type TGenres = {
	id: number;
	name: string;
};

type TResponseGenres = {
	genres: TGenres[];
};

type TMovieGenres = {
	genre: string;
	movies: TListMovies;
};

type TMovieVideo = {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: string;
	id: string;
};

type TResponseMovieVideos = {
	id: number;
	results: TMovieVideo[];
};
