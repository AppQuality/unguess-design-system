type BulletChartData = {
    ranges: number[];
    measures: number[];
    markers: number[];
};
export interface BulletChartProps {
    data: BulletChartData[];
    width?: string;
    height?: string;
    markerColor?: string;
    markerSize?: number;
    rangeColor?: string;
    measureSize?: number;
    measureColor?: string;
};