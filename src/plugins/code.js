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
		switch (node.name) {
			case 'Workflow':
				workflow.name = node.data.name;
				workflow.on = node.data.on;
				break;

			case 'Job':
				workflow.jobs[node.id] = {
					name: node.data.name,
					'runs-on': node.data.runner,
				};
				break;

			case 'Step':
				if (node.inputs.step.connections.length > 0) {
					let jobId = node.inputs.step.connections[0].node;
						console.assert(jobId);
					workflow.jobs[jobId].steps = workflow.jobs[jobId].steps || [];
					let _steps = workflow.jobs[jobId].steps;
						console.assert(_steps);
					if (node.data.custom) {
						const { name, run } = node.data;
						_steps.push({ name, run });
					} else {
						_steps.push({ uses: node.data.uses });
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
