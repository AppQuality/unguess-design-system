export function getColorByType(type: string) {
  switch (type) {
    case "observation":
      return "#ffff0040";
    case "positive":
      return "#00ff0040";
    case "negative":
      return "#ff000040";
    default:
      return "#00000040";
  }
}
