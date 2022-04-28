import { Component, Input, Output, Socket } from 'rete';
import JobControl from '../controls/Job';

import stepSocket from '../sockets/step';
import jobSocket from '../sockets/job';

export default class JobComponent extends Component {
  constructor() {
    super("Job");
  }

  builder(node) {
    const input = new Input("job", "Job", jobSocket);
    var out1 = new Output("step", "Step", stepSocket);
    var ctrl = new JobControl(this.editor, "step", node);

      return node
	  .addControl(ctrl)
	  .addInput(input)
	  .addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs["step"] = node.data.job;
  }
}

