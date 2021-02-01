import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import noImage from 'assets/images/no-image.png';
import './PlaylistItem.scss';

const PlaylistItem = ({ playlist }) => {
	const imageSrc = playlist.images.length ? playlist.images[0]['url'] : noImage;
	return (
		<Link to={`/playlist/${playlist.id}`}>
			<li className="playlist-item">
				<img className="playlist-item__image" src={imageSrc} alt="" />
				<div className="playlist-item__details">
					<h2>{playlist.name}</h2>
					<p>by {playlist.owner.display_name} &middot; {playlist.tracks.total} tracks</p>
				</div>
				<button aria-label="Go to playlist" title="Go to playlist">
					<ChevronRightIcon />
				</button>
			</li>
		</Link>
	)
}

export default PlaylistItem;
