import { configureStore } from '@reduxjs/toolkit';

import workflowReducer from '../features/workflowSlice';
import editorReducer from '../features/editorSlice';

export default configureStore({
    reducer: {
	workflow: workflowReducer,
	editor: editorReducer,
    }
});
