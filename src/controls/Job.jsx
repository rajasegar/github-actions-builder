import React from 'react';
import { Control } from 'rete';

export default class JobControl extends Control {
  static component = ({ name, onChange }) => (
    <div>
      <label>Name:</label>
    <input
      type="text"
      value={name}
      ref={(ref) => {
        ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
      }}
      onChange={(e) => onChange(e.target.value)}
    />
    </div>
  );

  constructor(emitter, key, node, readonly = false) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = JobControl.component;

    const initial = node.data[key] || "Lint";

    node.data[key] = initial;
    this.props = {
      readonly,
      name: initial,
      onChange: (v) => {
        this.setValue(v);
        this.emitter.trigger("process");
      }
    };
  }

  setValue(val) {
    this.props.name = val;
    this.putData('name', val);
    this.update();
  }
}
