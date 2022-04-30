import styles from './ImportButton.module.css';
import Icon from './icons/import'; 

function Import({onImport}) {
	return (
		<div className={styles.container}>
			<button type="button" title="Import Workflow" onClick={onImport}>
				<Icon /> Import
			</button>
		</div>
	);
}

export default Import;
