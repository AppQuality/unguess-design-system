import { Extension } from "@tiptap/core";
import { Annotation } from "./contracts";
import { AnnotationPlugin, AnnotationPluginKey } from "./pm/annotation-plugin";
import { getColorByType } from "./pm/rendering/getColorByType";

export interface AddAnnotationAction<K> {
  type: "addAnnotation";
  from: number;
  to: number;
  backgroundColor?: string;
  data: K;
}

export interface UpdateAnnotationAction<K> {
  type: "updateAnnotation";
  id: string;
  data: K;
}

export interface DeleteAnnotationAction {
  type: "deleteAnnotation";
  id: string;
}

interface AnnotationOptions<K> {
  /**
   * An event listener which receives annotations for the current selection.
   */
  onSelectionChange: (items: Annotation<K>[]) => void;
  /**
   * An event listener which receives all annotations.
   */
  onAnnotationListChange: (items: Annotation<K>[]) => void;
  instance: string;
}

export function AnnotationMagic<K>(): Extension {
  return Extension.create<AnnotationOptions<K>>({
    name: "annotation-magic",

    priority: 1000,

    addOptions() {
      return {
        onSelectionChange: (items) => items,
        onAnnotationListChange: (items) => items,
        document: null,
        field: "annotations",
        instance: "",
      };
    },

    onCreate() {
      const transaction = this.editor.state.tr.setMeta(AnnotationPluginKey, {
        type: "createDecorations",
      });

      // send a transaction to editor view, telling it to re-render annotations
      this.editor.view.dispatch(transaction);
    },

    addCommands<K>() {
      return {
        addAnnotation:
          (type: string, data: K) =>
          ({ dispatch, state }) => {
            const { selection } = state;

            if (selection.empty) {
              return false;
            }

            if (dispatch && data) {
              state.tr.setMeta(AnnotationPluginKey, {
                type: "addAnnotation",
                from: selection.from,
                to: selection.to,
                backgroundColor: getColorByType(type),
                data,
              });
            }

            return true;
          },
        updateAnnotation:
          (id: string, data: K) =>
          ({ dispatch, state }) => {
            if (dispatch) {
              state.tr.setMeta(AnnotationPluginKey, {
                type: "updateAnnotation",
                id,
                data,
              });
            }

            return true;
          },
        deleteAnnotation:
          (id) =>
          ({ dispatch, state }) => {
            if (dispatch) {
              state.tr.setMeta(AnnotationPluginKey, {
                type: "deleteAnnotation",
                id,
              });
            }
            return true;
          },
      };
    },

    addProseMirrorPlugins() {
      return [
        AnnotationPlugin<K>({
          onSelectionChange: this.options.onSelectionChange,
          onAnnotationListChange: this.options.onAnnotationListChange,
          instance: this.options.instance,
        }),
      ];
    },
  });
}
