import { useAuth } from '../../contexts/AuthContext';
import TrackListItem from '../elements/TrackListItem';
import PageHeader from '../elements/PageHeader';

const AllTopTracks = () => {
	const { top_tracks } = useAuth();

	return (
		<main className="top-tracks-page">
			<PageHeader title='Top Tracks' />
			<section>
				<ul>
					{top_tracks && top_tracks.items.map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default AllTopTracks
