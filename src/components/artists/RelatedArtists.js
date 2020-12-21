import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import RelatedArtistListItem from './RelatedArtistListItem';

const RelatedArtists = ({ artists }) => {
	return (
		<section className="related-artists">
			<header>
				<Link to='related'><h2>Related Artists</h2></Link>
				<ChevronRightIcon />
			</header>
			<ul className="related-artists-list">
				{artists.map((artist, index) => <RelatedArtistListItem artist={artist} key={index} />)}
			</ul>
		</section>
	)
}

export default RelatedArtists
