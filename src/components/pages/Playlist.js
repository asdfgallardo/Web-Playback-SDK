import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TrackListItem from '../elements/TrackListItem';
import { useAuth } from '../../contexts/AuthContext';
import usePlayer from '../../hooks/usePlayer';

const Playlist = () => {
	const navigate = useNavigate();
	const { playlistId } = useParams();
	const { spotify } = useAuth();
	const { playContext } = usePlayer();
	const [playlist, setPlaylist] = useState(null);

	useEffect(() => {
		spotify.getPlaylist(playlistId)
			.then(playlist => setPlaylist(playlist))
			.catch(error => console.log(error));
	}, [playlistId, spotify])

	return playlist && (
		<main className="playlist-page">
			<header className="playlist-page__header">
				<div className="playlist-page__header__inner">
					<ArrowBackIosIcon onClick={() => navigate(-1)} />
					<img src={playlist.images[0]['url']} alt={`album cover for ${playlist.name}`} />
					<h1>{playlist.name}</h1>
					<p>by {playlist.owner.display_name} &middot; {playlist.tracks.total} tracks &middot; {parseInt(playlist.followers.total).toLocaleString()} followers</p>
				</div>
				<button className="playlist-page__play-btn" onClick={() => playContext(playlist.uri)}>
					<PlaylistPlayIcon />
					<span>Play</span>
				</button>
			</header>
			<section>
				<ul>
					{playlist.tracks.items.map((playlist, index) => <TrackListItem key={index} track={playlist.track} album={playlist.track.album} />)}
				</ul>
			</section>
		</main>
	)
}

export default Playlist
