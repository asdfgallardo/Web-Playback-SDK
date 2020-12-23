import { Link } from 'react-router-dom'
import noImage from '../../assets/images/no-image.png'

const AlbumCard = ({ album }) => {
	const imageSrc = album.images.length ? album.images[album.images.length - 1]['url'] : noImage;
	return (
		<Link to={`/album/${album.id}`}>
			<li className="album-card">
				<header className="album-card__header">
					<img src={imageSrc} alt={album.name} />
				</header>
				<div className="album-card__body">
					<h3>{album.name}</h3>
					<p>{album.release_date.split('-')[0]} &middot; {album.album_type} </p>
				</div>
			</li>
		</Link>
	)
}

export default AlbumCard