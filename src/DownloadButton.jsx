import styles from './DownloadButton.module.css';
import { fileSave } from 'browser-nativefs';

import { selectWorkflow } from './features/workflowSlice';
import { useSelector } from 'react-redux';

import Icon from './icons/download'; 
function Download() {

  const code = useSelector(selectWorkflow);
  async function handleClick() {
    await fileSave(
              new Blob([code], { type: 'application/yml' }),
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
				<Icon/> Download 
			</button>
		</div>
	);
}

export default Download;
