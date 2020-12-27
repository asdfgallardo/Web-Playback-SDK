import { useState, useEffect } from 'react'
import { usePlayer } from '../../../contexts/PlayerContext'
import AlbumListItem from '../../elements/AlbumListItem'

const AllAlbums = ({ artistId }) => {
	const { spotify } = usePlayer();
	const [albums, setAlbums] = useState(null);

	useEffect(() => {
		spotify.getArtistAlbums(artistId, { limit: 50, country: 'from_token', include_groups: 'album' })
			.then((data) => {
				if (data.total) {
					setAlbums(data.items)
				}
			})
			.catch(error => console.log(error));
	}, [artistId, spotify])


	return albums && (
		<section>
			<h2>Albums</h2>
			<ul>
				{albums.map((album, index) => <AlbumListItem album={album} displayArtist={false} key={index} />)}
			</ul>
		</section>
	)
}

export default AllAlbums