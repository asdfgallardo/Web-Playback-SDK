import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { usePlayer } from '../../contexts/PlayerContext'
import TrackListItem from '../elements/TrackListItem'

const Recommendations = () => {
	const { spotify, top_artists, top_tracks } = usePlayer();
	const [recommendations, setRecommendations] = useState(null);

	useEffect(() => {
		const options = { country: 'from_token', timestamp: new Date().toISOString() };
		const artistIds = top_artists.items.map(item => item.id).splice(0, 3).join(',');
		const trackIds = top_tracks.items.map(item => item.id).splice(0, 2).join(',');

		spotify.getRecommendations({ ...options, seed_artists: artistIds, seed_tracks: trackIds })
			.then(({ tracks }) => setRecommendations(tracks))
			.catch(error => console.log(error))

	}, [spotify, top_artists, top_tracks])

	return recommendations && (
		<section>
			<header>
				<Link to='recommendations'>
					<h2>Recommended for you</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul>
				{recommendations.splice(0, 5).map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
			</ul>
		</section>
	)
}

export default Recommendations
