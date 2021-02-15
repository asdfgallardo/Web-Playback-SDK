import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TrackListItem from 'components/partials/track/TrackListItem';
import PlayButton from 'components/partials/PlayButton';
import noImage from 'assets/images/no-image.png';
import { getAlbum, getAlbumTracks } from 'services/spotifyAPI';
import './Album.scss';
import Spinner from 'components/partials/Spinner';

const Album = () => {
	const navigate = useNavigate();
	const { albumId } = useParams();
	const [album, setAlbum] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAlbum(albumId)
			.then(data => {
				setAlbum(data);
				setLoading(false);
			})
			.catch(error => console.log(error));
	}, [albumId])

	if (loading) {
		return <Spinner />
	}

	return album && (
		<main id="album" className="main-view">
			<header className="header">
				<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} />
				<img className="cover-img" src={album.image_url ? album.image_url : noImage} alt='album cover' />
				<div>
					<h2 className="sub-title">{album.type}</h2>
					<h1 className="title">{album.name}</h1>
					<p className="desc">{album.artists}</p>
					<p className="details">{album.total_tracks} tracks &middot; {album.total_length} minutes</p>
				</div>
				<PlayButton uri={album.player_uri} />
			</header>
			<section className="tracks">
				<ul className="list">
					{album.tracks.map(track => (
						<TrackListItem key={track.id} track={track} album={album} displayAlbumTitle={false} />
					))}
				</ul>
			</section>
		</main>
	)
}

export default Album;