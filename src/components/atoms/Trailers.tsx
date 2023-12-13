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
		<>
			<div className="text-2xl mb-5 mt-10">Trailers</div>
			<div className="relative overflow-hidden w-full" style={{ paddingTop: '56.35%' }}>
				<iframe
					className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
					width="100%"
					height="1000px"
					src={`https://www.youtube.com/embed/${videoKey}`}
					title="YouTube video player"
					allow=""
					allowFullScreen
				></iframe>
			</div>
		</>
	);
}

export default Trailers;
