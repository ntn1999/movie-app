import axiosClient from '@/api/axios.client';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

type TTrailers = {
	movieId?: string;
};

function Trailers(props: TTrailers) {
	const [videoKey, setVideoKey] = useState<string>();

	useEffect(() => {
		(async () => {
			// get video youtube trailers
			const responseMovieVideo: AxiosResponse<TResponseMovieVideos> = await axiosClient.get(
				`/movie/${props.movieId}/videos`,
			);
			const { results } = responseMovieVideo.data;
			const [firstTrailer] = results;

			setVideoKey(firstTrailer.key);
		})();
	}, []);

	return (
		<div className="p-10">
			<div className="text-2xl mb-5">Trailers</div>
			<iframe
				width="100%"
				height={680}
				src={`https://www.youtube.com/embed/${videoKey}`}
				title="YouTube video player"
				allow=""
				allowFullScreen
			></iframe>
		</div>
	);
}

export default Trailers;
