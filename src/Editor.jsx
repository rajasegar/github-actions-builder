import { useRete } from "./rete";

import { selectEditor } from './features/editorSlice';
import { useSelector } from 'react-redux';

function Editor({onChange}) {

    const config = useSelector(selectEditor);

	const [setContainer] = useRete(config, onChange);

	return (
			<div className="editor-wrapper"
				ref={(ref) => ref && setContainer(ref)}
				styles={{ height: 'calc(100vh - 100px)' }}
			/>
	);
}

export default Editor;
