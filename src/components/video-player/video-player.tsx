type VideoPlayerProps = {
  videoLink: string;
  posterSrc: string;
}

function VideoPlayer(props: VideoPlayerProps) {
  return (
    <video
      src={props.videoLink}
      poster={props.posterSrc}
      width="200"
      height="175"
      muted
      autoPlay/>
  );
}

export default VideoPlayer;
