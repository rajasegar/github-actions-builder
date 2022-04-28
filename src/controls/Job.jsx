import React from 'react';
import { Control } from 'rete';
import './Job.css';

export default class JobControl extends Control {
  static component = ({ name, runner, onChange, updateRunner }) => (
    <div className='wrapper'>
      <p><label>Name:</label></p>
      <p>
    <input
      type="text"
      value={name}
      ref={(ref) => {
        ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
      }}
      onChange={(e) => onChange(e.target.value)}
    />
      </p>
      <p><label>runs-on:</label></p>
      <p>
    <input
      type="text"
      value={runner}
      ref={(ref) => {
        ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
      }}
      onChange={(e) => updateRunner(e.target.value)}
    />
      </p>
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
      runner: 'ubuntu-latest',
      onChange: (v) => {
        this.setValue(v);
        this.emitter.trigger("process");
      },
      updateRunner: (v) => {
        this.setRunner(v);
        this.emitter.trigger("process");
      },
    };
  }

  setValue(val) {
    this.props.name = val;
    this.putData('name', val);
    this.update();
  }

  setRunner(val) {
    this.props.runner = val;
    this.putData('runner', val);
    this.update();
  }
}
