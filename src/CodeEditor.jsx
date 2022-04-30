import { useSelector } from 'react-redux';
import { selectWorkflow } from './features/workflowSlice';
import styles from './CodeEditor.module.css';
function CodeEditor() {
		const code = useSelector(selectWorkflow);

		function handleChange() {}
		
		return (
			<div className={styles.codeWrapper}>
				<textarea className={styles.code} value={code} onChange={handleChange} />
			</div>
		);
}

export default CodeEditor;
