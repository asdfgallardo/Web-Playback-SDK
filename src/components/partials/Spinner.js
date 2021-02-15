import './Spinner.scss';

const Spinner = () => {
	return (
		<main className="main-view spinner-container">
			<div className="spinner" role="status" aria-label="Page is loading, do not refresh"><div></div><div></div><div></div><div></div></div>
		</main>
	)
}

export default Spinner;