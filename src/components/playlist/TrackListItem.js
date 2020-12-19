import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const TrackListItem = ({ track }) => {
	return (
		<li className="track-list__item">
			<img className="track-list__image" src={track.album.images.length ? track.album.images[track.album.images.length - 1]['url'] : ''} alt="" />
			<div className="track-list__details">
				<h2>{track.name}</h2>
				<p>{track.artists.map((artist) => artist.name).join(', ')} &middot; {track.album.name}</p>
			</div>
			<PlayArrowIcon />
		</li>
	)
}

export default TrackListItem
