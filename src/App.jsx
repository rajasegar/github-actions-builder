import './App.css'

import Editor from './Editor';
import CodeEditor from './CodeEditor';
import Header from './Header';
import Footer from './Footer';

import { useState } from 'react';
import initialData from './initialData';

import { loadFromYml } from './utils/import';
import convert from './utils/convertYMLToNodes';


import { useDispatch } from 'react-redux';
import { update } from './features/editorSlice';

import { update as updateCode } from './features/workflowSlice';

import { generate } from './plugins/code';

function App() {

	const dispatch = useDispatch();

	async function handleImport() {

		const yml = await loadFromYml();
		let newConfig = convert(yml);
		dispatch(update(newConfig));
		console.log('yml imported');
	}

		async function onChange(data) {
				const code = await generate(data);
				dispatch(updateCode(code));
		}

	return (
		<div className="App">
			<Header onImport={handleImport} />
		<div className="grid">
			<Editor onChange={onChange} />
			<CodeEditor/>
		</div>
			<Footer />
		</div>
	);

}

export default App
