import { useEffect, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { getUsersSavedAlbums, getFollowedArtists } from 'services/spotifyAPI';
import DiscoverCard from 'components/partials/cards/DiscoverCard';
import ErrorView from 'components/layout/views/ErrorView';
import PageHeader from 'components/layout/sections/PageHeader';
import GridSection from 'components/layout/sections/GridSection';
import MainView from 'components/layout/views/MainView';
import LoadingView from 'components/layout/views/LoadingView';

const Dashboard = () => {
	const { discover_weekly, user_playlists, user } = useAuth();
	const [artists, setArtists] = useState(null);
	const [albums, setAlbums] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		document.title = process.env.REACT_APP_PAGE_TITLE + 'Dashboard';
	}, [])

	useEffect(() => {
		const FETCH_DATA = [
			getUsersSavedAlbums(),
			getFollowedArtists(),
		];
		Promise.all(FETCH_DATA)
			.then(([albums, artists]) => {
				setAlbums(albums);
				setArtists(artists);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			})
	}, [])

	if (loading) {
		return <LoadingView />;
	}

	if (error) {
		return <ErrorView />;
	}

	return (
		<MainView id="dashboard">
			<PageHeader title="Your music" />
			<DiscoverCard playlist={discover_weekly} user={user} />
			<GridSection title="Playlists" link="playlists" items={user_playlists.items} />
			<GridSection title="Artists" link="artists" items={artists.items} />
			<GridSection title="Albums" link="albums" items={albums.items} />
		</MainView>
	);
}

export default Dashboard;
