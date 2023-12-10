type TTrailers = {
	videoKey: string;
	width?: string;
	height?: string;
};

function Trailers(props: TTrailers) {
	return (
		<iframe
			width={props.width ?? 1200}
			height={props.height ?? 680}
			src={`https://www.youtube.com/embed/${props.videoKey}`}
			title="YouTube video player"
			allow=""
			allowFullScreen
		></iframe>
	);
}

export default Trailers;
