import { useSelector, useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

import { Checkbox, Select } from '@/components/atoms';
import { SearchInput } from '@/components/molecules';

import { RootState } from '@/store';
import { ESearchValue } from '@/enums';
import { setMovieSearchQuery, setSearchByType, setSearchInput } from '@/store/movie.reducer';
import { useEffect, useState } from 'react';
import axiosClient from '@/api/axios.client';

function Search() {
	const [listGenres, setListGenres] = useState<TGenres[]>([]);
	const dispatch = useDispatch();
	const { searchInput } = useSelector((state: RootState) => state.movie);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		dispatch(setMovieSearchQuery(searchInput));
		e.preventDefault();
	};

	useEffect(() => {
		(async () => {
			const response: AxiosResponse<TResponseGenres> = await axiosClient.get('/genre/movie/list');
			const { genres } = response.data;

			setListGenres(genres);
		})();
	}, []);

	return (
		<div className="flex justify-center items-center m-10">
			<Select
				label="Search by..."
				options={[
					{ value: ESearchValue.MULTI, text: 'All' },
					{ value: ESearchValue.MOVIE, text: 'Movie' },
					{ value: ESearchValue.PERSON, text: 'Stars' },
				]}
				onChange={(value: string) => dispatch(setSearchByType(value))}
			/>
			<Select
				label="Search by genres"
				options={listGenres.map((genres) => ({ value: genres.id, text: genres.name }))}
				onChange={(value: string) => console.log(value)}
			/>

			<SearchInput
				value={searchInput}
				placeHolder="Search movie..."
				onChange={(value) => dispatch(setSearchInput(value))}
				submitHandler={handleSubmit}
			/>
		</div>
	);
}

export default Search;
