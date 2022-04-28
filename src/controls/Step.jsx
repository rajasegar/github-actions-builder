import  React from 'react';
import { Control } from 'rete';
import './Step.css';

export default class StepControl extends Control {
  static component = ({ uses, name, run,onChange, updateName, updateRun, updateCustom }) => {
    
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
	<input type="text"  value={name} onChange={(e) => updateName(e.target.value) } />
	</p>
	<p>
	  <label>Run:</label>
	<input type="text" value={run}  onChange={(e) => updateRun(e.target.value) } />
	</p>
      </div>);
      
    } else {
      step = <input
      type="text"
      value={uses}
      ref={(ref) => {
        ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
      }}
      onChange={(e) => onChange(e.target.value)}
    />;
    }
  return (
    <div className='wrapper'>
    <div className="flex">
      <label>
	<input type="radio"  onClick={() => handleRadio(false) }  checked={!isCustom} onChange={() => {}} /> Uses
      </label>
      <label>
	<input type="radio"  onClick={() => handleRadio(true) } checked={isCustom} onChange={() => {}} /> Custom
      </label>
    </div>
    {step}
    </div>
  );
  }

  constructor(emitter, key, node, readonly = false) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = StepControl.component;

    node.data['uses'] = 'actions/checkout@v2'; 
    node.data['custom'] = false;
    this.props = {
      readonly,
      uses: node.data['uses'],
      name: node.data['name'] || 'npm install',
      run: node.data['run'] || 'npm i',
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
    this.props.uses = val;
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
    this.putData('name', this.props.name);
    this.putData('run', this.props.run);
    this.update();
  }
}
