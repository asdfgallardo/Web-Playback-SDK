import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { usePlayer } from '../../contexts/PlayerContext';
import TrackListItem from '../elements/TrackListItem';

const TopTracks = () => {
	const { top_tracks } = usePlayer();

	return (
		<section className="top-tracks">
			<header>
				<Link to='top-tracks'>
					<h2>Top Tracks</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul>
				{top_tracks && top_tracks.items.slice(0, 5).map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
			</ul>
		</section>
	)
}

export default TopTracks