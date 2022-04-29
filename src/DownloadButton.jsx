import styles from './DownloadButton.module.css';
import { fileSave } from 'browser-nativefs';

function Download() {

  async function handleClick() {
    await fileSave(
              new Blob([blob], { type: 'application/yml' }),
              {
			fileName: 'workflow.yml',
			description: 'Github Actions Workflow file',
		},
		window.handle
	)
	}


	return (
		<div className={styles.container}>
			<button id="btn-download-project" type="button" title="Download Project" onClick={handleClick}>
				Download <fw-icon size="8" name="download"></fw-icon>
			</button>
		</div>
	);
}

export default Download;
