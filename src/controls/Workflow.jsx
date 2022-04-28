import React from 'react';
import { Control } from 'rete';

export default class WorkflowControl extends Control {
  static component = ({ value, onChange, onUpdateName }) => (
    <div>
      <p>
      <label>name:</label>
      <input type="text" onChange={(e) => onUpdateName(e.target.value) } />
      </p>
     <p> 
    <label>on:</label>
    <select
      ref={(ref) => {
        ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
      }}
      onChange={(e) => onChange(e.target.value)}>
    <option value="push">push</option>
    <option value="pull_request">pull_request</option>
    </select>
     </p>
    </div>
  );

  constructor(emitter, key, node, readonly = false) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = WorkflowControl.component;

    const initial = node.data[key] || "";

    node.data[key] = initial;
    this.props = {
      readonly,
      value: initial,
      onChange: (v) => {
        this.setValue(v);
        this.emitter.trigger("process");
      },
      onUpdateName: (v) => {
	this.setName(v);
        this.emitter.trigger("process");
      }
    };
  }

  setValue(val) {
    this.props.value = val;
    this.putData('on', val);
    this.update();
  }

  setName(val) {
    this.props['name'] = val;
    this.putData('name', val);
    this.update();
  }
}