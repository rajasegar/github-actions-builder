export default {
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
              input: "job",
		data: { runner: 'ubuntu-latest'}
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
      inputs: {
	job: {
	  connections: [
	    {
	      node: 1,
		input: 'workflow',
		data: { runner: 'ubuntu-latest' }
	    }
	  ]
	}
      },
      outputs: {
        step: {
          connections: [
            {
              node: 3,
              input: "step",
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
      inputs: {
	step: {
	  connections: [
	    {
	      node: 2,
	      output: 'step'
	    }
	  ]
	}
      },
      outputs: {},
      position: [900, 10],
      name: "Step"
    }
  }
	};
