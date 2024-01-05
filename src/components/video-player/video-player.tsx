type VideoPlayerProps = {
  videoLink: string;
  posterSrc: string;
}

function VideoPlayer(props: VideoPlayerProps) {
  return (
    <video
      src={props.videoLink}
      poster={props.posterSrc}
      width="100%"
      height="100%"
      muted
      autoPlay
    />
  );
}

export default VideoPlayer;
