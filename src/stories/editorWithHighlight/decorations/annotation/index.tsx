import { Annotation as iAnnotation } from "./contracts";
import { AnnotationMagic } from "./extension";

interface AnnotationData {
  type: "observation" | "positive" | "negative";
}

export const Annotation = AnnotationMagic<AnnotationData>().configure({
  onAnnotationListChange: (annotations: iAnnotation<AnnotationData>[]) => {
    console.log("Annotations", annotations);
  },
  onSelectionChange: (selectedAnnotations: iAnnotation<AnnotationData>[]) => {
    // console.log("Selected Annotations", selectedAnnotations);
  },
});
