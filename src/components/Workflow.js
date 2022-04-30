import { Component, Output, Socket } from 'rete';
import WorkflowControl from '../controls/Workflow';

import jobSocket from '../sockets/job';

export default class WorkflowComponent extends Component {
  constructor() {
    super("Workflow");
  }

  builder(node) {
    var out1 = new Output("job", "Job", jobSocket);
    var ctrl = new WorkflowControl(this.editor, "workflow", node);

    return node.addControl(ctrl).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs["job"] = node.data.job;
  }
}

