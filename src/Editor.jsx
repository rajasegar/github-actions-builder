import { useState } from 'react';
import { useRete } from "./rete";

import { generate } from './plugins/code';
import initialData from './initialData';

function Editor() {

	const [code, setCode] = useState('');

	async function onChange(data) {
    const sourceCode = await generate(data);
    setCode(sourceCode);
  }

  const [setContainer] = useRete(initialData, onChange);

  function handleChange() {
    
  }

  return (
    <div className="grid">
    <div className="editor-wrapper" 
      ref={(ref) => ref && setContainer(ref)}
    styles={{height: 'calc(100vh - 100px)'}}
    />
    <div className="code-wrapper">
      <textarea rows="50" className="code" value={code} onChange={handleChange} />
    </div>
    </div>
  );
}

export default Editor;
