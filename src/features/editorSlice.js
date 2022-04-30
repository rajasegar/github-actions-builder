import { createSlice } from '@reduxjs/toolkit';
import initialData from '../initialData';

const editorSlice = createSlice({
    name: 'editor',
    initialState: {
	value: initialData
    },
    reducers: {
	update: (state, action) => {
	    state.value = action.payload;
	}
    }
});

export const { update } = editorSlice.actions;

export const selectEditor = (state) => state.editor.value; 

export default editorSlice.reducer;
