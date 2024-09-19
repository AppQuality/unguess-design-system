import { Plugin, PluginKey } from "@tiptap/pm/state";

import { Annotation } from "../../contracts";
import { AnnotationState } from "./annotation-state";

export const AnnotationPluginKey = new PluginKey("annotation-magic");
export interface AnnotationPluginOptions<K> {
  onSelectionChange: (items: Annotation<K>[]) => void;
  onAnnotationListChange: (items: Annotation<K>[]) => void;
  instance: string;
}

export const AnnotationPlugin = <K,>(options: AnnotationPluginOptions<K>) =>
  new Plugin({
    key: AnnotationPluginKey,

    state: {
      init() {
        return new AnnotationState({
          map: new Map<string, Annotation<K>>(),
          instance: options.instance,
          onAnnotationListChange: options.onAnnotationListChange,
          onSelectionChange: options.onSelectionChange,
        });
      },
      apply(transaction, pluginState, oldState, newState) {
        return pluginState.apply(transaction, newState);
      },
    },

    props: {
      decorations(state) {
        const { decorations } = this.getState(state)!;
        const { selection } = state;

        // multiple characters selected
        if (!selection.empty) {
          const annotations = this.getState(state)!.termsAt(
            selection.from,
            selection.to
          );
          options.onSelectionChange(annotations);
          return decorations;
        } else {
          // only cursor change
          const annotations = this.getState(state)!.termsAt(selection.from);

          options.onSelectionChange(annotations);

          return decorations;
        }
      },
    },
  });
