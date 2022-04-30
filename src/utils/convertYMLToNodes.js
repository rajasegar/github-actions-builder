import { load } from 'js-yaml';
function getWorkflow(yml) {
	const [on] = Object.keys(yml.on);
	return {
		id: 1,
		data: {
			name: yml.name,
			on,
		},
		inputs: {},
			outputs: {
					job: {
							connections: []
					}
		},
		position: [10, 10],
		name: 'Workflow'
	};

}

function getJobs(yml) {
	return Object.keys(yml.jobs).map((job, idx) => {
		return {
			id: idx + 2,
			data: {
				name: job,
				runner: yml.jobs[job]['runs-on']
			},
				inputs: {
						job: {
								connections: []
						}
			},
				outputs: {
						step: {
								connections: []
						}
			},
			position: [10, 10],
			name: 'Job'

		};

	});
}

function getSteps(jobName, yml) {
		const job = yml.jobs[jobName];
		const steps = [];

		 job.steps.forEach((step, idx) => {
				const temp =  {
						id: idx + 3,
						data: {
								custom: step.uses ? false: true,
								...step
						},
						inputs: {
						step: {
								connections: [{ node: job.id, output: 'step' }]
						}
						},
						outputs: {},
						position: [10 * idx, 10 * idx],
						name: 'Step'
				};
				 steps.push(temp);
		});		

		return steps;
}

export default function(contents) {

	const yml = load(contents);
	const workflow = getWorkflow(yml);
	const jobs = getJobs(yml);

	const config = {
		id: "demo@0.1.0",
		nodes: {}
	};

	config.nodes["1"] = workflow;
	jobs.forEach((job) => {
		config.nodes[job.id] = job;
			const steps =  getSteps(job.data.name, yml);

			const connections = steps.map(step => {
							return {
									node: step.id,
									input: 'step',
									data: {}
							};
			});


			const outputs = {
					step: {
							connections,
					}
			};

			job.outputs = outputs;

		steps.forEach((step) => {
				config.nodes[step.id] = step;
		});

	});

		


	return config;
}

