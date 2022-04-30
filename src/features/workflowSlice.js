import { createSlice } from '@reduxjs/toolkit';

const workflowSlice = createSlice({
	name: 'workflow',
	initialState: {
		value: ''
	},
	reducers: {
		update: (state, action) => {
			state.value = action.payload;
		}
	}
});

export const { update } = workflowSlice.actions;

export const selectWorkflow = (state) => state.workflow.value;

export default workflowSlice.reducer;
