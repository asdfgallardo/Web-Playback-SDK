import moment from 'moment';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import noImage from '../../assets/images/no-image.png'
import { usePlayback } from '../../contexts/PlaybackContext';
import { useEffect, useState } from 'react';

const NowPlayingModal = () => {
	const [current, setCurrent] = useState(0);
	const [progress, setProgress] = useState(0);
	const { display_player, current_track, is_playing, player, context, dispatch } = usePlayback();
	const imageSrc = current_track && current_track.album.images.length ? current_track.album.images[0]['url'] : noImage;

	useEffect(() => {
		let interval;
		if (is_playing) {
			interval = setInterval(() => {
				player.getCurrentState().then(({ position }) => {
					setCurrent(position);
					setProgress(Math.min(1, position / current_track.duration_ms));
				})
			}, 1000);
		}
		else {
			clearInterval(interval)
		}

		return () => clearInterval(interval);
	}, [current_track, is_playing, player])

	const prevTrack = () => (
		player.previousTrack()
	)

	const nextTrack = () => {
		player.nextTrack();
	}

	const togglePlay = () => {
		player.togglePlay();
	}

	return display_player && current_track && (
		<section className="now-playing-modal">
			<header>
				<ExpandMoreIcon onClick={() => dispatch({ type: 'SET_DISPLAY_PLAYER', display_player: false })} />
				<small>Now playing</small>
				<p>{context && context.uri ? context.metadata.context_description : current_track.album.name}</p>
			</header>
			<div className="now-playing">
				<img className="album-cover" src={imageSrc} alt="" />
				<h2 className="track-title">{current_track.name}</h2>
				<p className="artist">{current_track.artists.map((artist) => artist.name).join(', ')}</p>
			</div>
			<div className="player-controls">
				<SkipPreviousIcon style={{ fontSize: 40 }} onClick={prevTrack} />
				{is_playing
					? <PauseCircleOutlineIcon style={{ fontSize: 65 }} onClick={togglePlay} />
					: <PlayCircleOutlineIcon style={{ fontSize: 65 }} onClick={togglePlay} />
				}
				<SkipNextIcon style={{ fontSize: 40 }} onClick={nextTrack} />
			</div>
			<footer className="playback-bar">
				<div className="progress-bar">
					<div className="progress-bar__wrapper">
						<div className="progress-bar__progress" style={{ transform: `translateX(-${100 - 100 * progress}%)` }}></div>
						{/* <button className="progress-bar__slider"></button> */}
					</div>
				</div>
				<div className="progress-time">
					<small>{moment(current).format('mm:ss')}</small>
					<small>{moment(current_track.duration_ms).format('mm:ss')}</small>
				</div>
			</footer>
		</section>
	)
}

export default NowPlayingModal
