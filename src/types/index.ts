type AppStateType = {
	listMovies: IResponseMovies;
	movies: IMovies[];
	movie: IMovie;
};

type IMovies = {
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

type IResponseMovies = {
	page: number;
	results: IMovies[];
	total_pages: number;
	total_results: number;
};

type IMovie = {
	adult: false;
	backdrop_path: string;
	belongs_to_collection: {
		id: number;
		name: string;
		poster_path: string;
		backdrop_path: string;
	};
	budget: number;
	genres: [
		{
			id: number;
			name: string;
		},
		{
			id: number;
			name: string;
		},
	];
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
	release_date: Date;
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
		cast: ICast[];
		crew: [];
	};
};

type ICast = {
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
