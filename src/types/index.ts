type TResults = {
	OK: '0';
	NG: '1';
};

type TResponseDB<T> = {
	results: TResults['OK' | 'NG'];
	dataPart: T;
	errorInfo?: {
		errorItem: string | null;
		messageId: string | null;
		errorMessage: string;
	};
};

type TCart = {
	id?: number;
	movie_id: number;
};

type TCarts = TCart[];

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
	name: string;
	known_for_department: string;
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
	inCart: boolean;
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: {
		id: number;
		name: string;
		poster_path: string;
		backdrop_path: string;
	};
	budget: number;
	genres: {
		id: number;
		name: string;
	}[];
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

type TResponseAPI = {
	page: number;
	results: TListMovies;
	total: number;
};
