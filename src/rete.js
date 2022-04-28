import "regenerator-runtime/runtime.js";
import React, { useState, useEffect, useRef } from "react";
import { NodeEditor, Engine } from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";

import WorkflowComponent from "./components/Workflow";
import JobComponent from "./components/Job";
import StepComponent from "./components/Step";

import ContextMenuPlugin, { ReactMenu } from "rete-context-menu-plugin-react";

export async function createEditor(container, config, onChange) {
  var components = [
      new WorkflowComponent(),
      new JobComponent(),
      new StepComponent()
  ];

  var editor = new NodeEditor("demo@0.1.0", container);
  editor.use(ConnectionPlugin);
  editor.use(ReactRenderPlugin);
  editor.use(ContextMenuPlugin, {
    Menu: ReactMenu,
  });

  const engine = new Engine("demo@0.1.0");

  components.map((c) => {
    editor.register(c);
    engine.register(c);
  });


  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      await engine.abort();
      await engine.process(editor.toJSON());
      await onChange(editor.toJSON());
    }
  );

  editor.view.resize();
  editor.trigger("process");
  // AreaPlugin.zoomAt(editor, editor.nodes);

    //Load up the initial config
  if (config) {
    await engine.abort();
    editor.fromJSON(config);
  }

}

export function useRete(config, onChange) {
  const [container, setContainer] = useState(null);
  const editorRef = useRef();

  useEffect(() => {
    if (container) {
	createEditor(container, config, onChange).then((value) => {
        console.log("created");
        editorRef.current = value;
      });
    }
  }, [container]);

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        console.log("destroy");
        editorRef.current.destroy();
      }
    };
  }, []);

  return [setContainer];
}
