import { Meta, StoryFn } from "@storybook/react";
import { PieChart } from ".";
import { PieChartProps } from "./_types";

const Template: StoryFn<PieChartProps> = (args) => (
  <div
    style={{
      width: "350px",
      height: "500px",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <PieChart {...args} />
  </div>
);

const data = [
  {
    id: "Use case 1: Carrello di acquisto",
    label: "sass label",
    value: 309,
    custom_data: "custom data",
  },
  {
    id: "Use case 2: Registrazione e login",
    label: "make label",
    value: 420,
  },
  {
    id: "Use case 3: Pagamento e checkout",
    label: "erlang label",
    value: 300,
  },
  {
    id: "Use case 4: Gestione profilo utente",
    label: "lisp label",
    value: 491,
  },
  {
    id: "Use case 5: Gestione ordini",
    label: "go label",
    value: 108,
  },
];

export const Default = Template.bind({});
Default.args = {
  width: "100%",
  height: "100vh",
  data: data,
  centerItem: {
    label: "Tot. bugs",
    value: "27",
  },
  legend: { columns: 4 },
};

export const WithCustomTooltip = Template.bind({});
WithCustomTooltip.args = {
  width: "100%",
  height: "100vh",
  data: data,
  centerItem: {
    label: "Tot. bugs",
    value: "27",
  },
  tooltip: ({ label, value, data }) => (
    <>
      <div
        style={{
          background: "purple",
          color: "white",
          padding: "10px",
          margin: "0",
        }}
      >
        {`i'm the label ${label}!`}
      </div>
      <div
        style={{ color: "yellow", background: "red" }}
      >{`and i'm the value ${value}!`}</div>
      {data?.custom_data && (
        <div
          style={{ color: "red", background: "yellow" }}
        >{`and this is other stuff ${JSON.stringify(data.custom_data)}!`}</div>
      )}
    </>
  ),
};

export const WithCustomLabel = Template.bind({});
WithCustomLabel.args = {
  width: "100%",
  height: "100vh",
  data: data,
  centerItem: {
    label: "Tot. bugs",
    value: "27",
  },
  labelFormatter: ({ label, id, labelPosition, ...data }) =>
    data.data?.custom_data
      ? data.data.custom_data.toString()
      : labelPosition === "arclink"
        ? `${label} ${id}`
        : `${id}`,
  legend: true,
};

export default {
  title: "Atoms/Charts/Pie",
  component: PieChart,
} as Meta<typeof PieChart>;
