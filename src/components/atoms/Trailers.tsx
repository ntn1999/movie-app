type TTrailers = {
	videoKey?: string;
	width?: string;
	height?: string;
};

function Trailers(props: TTrailers) {
	return (
		<div className="p-10">
			<div className="text-2xl mb-5">Trailers</div>
			<iframe
				width="100%"
				height={props.height ?? 680}
				src={`https://www.youtube.com/embed/${props.videoKey}`}
				title="YouTube video player"
				allow=""
				allowFullScreen
			></iframe>
		</div>
	);
}

export default Trailers;
