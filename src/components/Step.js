import { Component, Input, Socket } from 'rete';
import StepControl from '../controls/Step';

import stepSocket from '../sockets/step';

export default class StepComponent extends Component {
  constructor() {
    super("Step");
  }

  builder(node) {
      const input = new Input("step", "Step", stepSocket);
    var ctrl = new StepControl(this.editor, "step", node);

    return node.addControl(ctrl).addInput(input);
  }

  worker(node, inputs, outputs) {
    inputs["step"] = node.data.step;
  }
}

