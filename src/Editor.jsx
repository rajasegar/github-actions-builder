import { useState } from 'react';
import { useRete } from "./rete";

import { generate } from './plugins/code';

function Editor() {
  const initialData = {
  id: "demo@0.1.0",
  nodes: {
    "1": {
      id: 1,
      data: {
        name: 'Sample Workflow',
	on: 'push'
      },
      inputs: {},
      outputs: {
        job: {
          connections: [
            {
              node: 2,
              input: "num1",
              data: {}
            }
          ]
        }
      },
      position: [10, 10],
      name: "Workflow"
    },
    "2": {
      id: 2,
      data: {
        name: 'lint' 
      },
      inputs: {},
      outputs: {
        step: {
          connections: [
            {
              node: 3,
              input: "num1",
              data: {}
            }
          ]
        }
      },
      position: [400, 10],
      name: "Job"
    },
    "3": {
      id: 3,
      data: {
        custom: false,
	uses: 'actions/checkout@v2'
      },
      inputs: {},
      outputs: {},
      position: [900, 10],
      name: "Step"
    }
  }
	};

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
    />
    <div className="code-wrapper">
      <textarea rows="50" className="code" value={code} onChange={handleChange} />
    </div>
    </div>
  );
}

export default Editor;
