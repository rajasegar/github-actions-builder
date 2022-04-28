import { dump } from 'js-yaml';

export async function generate(data) {
  let code = '';

    let workflow = {
	name: 'Sample Workflow',
	on: 'push',
	jobs: {}
    };


  for (const key in data.nodes) {
    const node = data.nodes[key];
      console.log(node);
    switch (node.name) {
      case 'Workflow':
	workflow.name = node.data.name;
	workflow.on = node.data.on;
        break;

      case 'Job':
	workflow.jobs[node.id] = {
	    name: node.data.name,
	    'runs-on': 'ubuntu-latest',
	    steps: []
	};
        break;

      case 'Step':
	if(node.inputs.step.connections.length > 0) {
	    let _job = node.inputs.step.connections[0].node;
	    let _steps = workflow.jobs[_job].steps || [];
	    if(node.data.custom) {
		const {name, run} = node.data;
		_steps.push({name, run});
	    } else {
	    _steps.push({uses: node.data.uses});
	    }
	}
        break;


      default:
        console.error('Not handled: ', node.name);
    }
  }

  code = dump(workflow);
  return code;
}
