import  React from 'react';
import { Control } from 'rete';

export default class StepControl extends Control {
  static component = ({ value, onChange, updateName, updateRun, updateCustom }) => {
    
  const [isCustom, setIsCustom] = React.useState(false);

    function handleRadio(value) {
      setIsCustom(value);
      updateCustom(value);
    }

    let step;
    if(isCustom) {
      step = (<div>
	<p>
	  <label>Name:</label>
	<input type="text"  onChange={(e) => updateName(e.target.value) } />
	</p>
	<p>
	  <label>Run:</label>
	<input type="text"  onChange={(e) => updateRun(e.target.value) } />
	</p>
      </div>);
      
    } else {
      step = <input
      type="text"
      value={value}
      ref={(ref) => {
        ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
      }}
      onChange={(e) => onChange(e.target.value)}
    />;
    }
  return (
    <div>
    <p>
      <label>
	<input type="radio" name="custom" onClick={() => handleRadio(false) }  checked={!isCustom} onChange={() => {}} /> Uses
      </label>
      <label>
	<input type="radio" name="custom" onClick={() => handleRadio(true) } checked={isCustom} onChange={() => {}} /> Custom
      </label>
    </p>
    {step}
    </div>
  );
  }

  constructor(emitter, key, node, readonly = false) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = StepControl.component;

    const initial = node.data[key] || "";

    node.data[key] = initial;
    this.props = {
      readonly,
      value: initial,
      onChange: (v) => {
        this.setValue(v);
        this.emitter.trigger("process");
      },
      updateName: (v) => {
        this.setName(v);
        this.emitter.trigger("process");
      },
      updateRun: (v) => {
        this.setRun(v);
        this.emitter.trigger("process");
      },
      updateCustom: (v) => {
        this.setCustom(v);
        this.emitter.trigger("process");
      }
    };
  }

  setValue(val) {
    this.props.value = val;
    this.putData('uses', val);
    this.update();
  }

  setName(val) {
    this.props.name = val;
    this.putData('name', val);
    this.update();
  }

  setRun(val) {
    this.props.run = val;
    this.putData('run', val);
    this.update();
  }

  setCustom(val) {
    this.props.custom = val;
    this.putData('custom', val);
    this.update();
  }
}
