import { BasicTooltip } from "@nivo/tooltip";

export const CustomTooltip = ({ v0, v1, color }: { color: string; v0: number; v1?: number }) => {
  return (
    <BasicTooltip
      id={
        v1 ? (
          <span>
            <strong>{v0}</strong>-<strong>{v1}</strong>%
          </span>
        ) : (
          <strong>{v0}</strong>
        )
      }
      enableChip={true}
      color={color}
    />
  )
}