import { Meta, StoryFn } from "@storybook/react";
import { CheckboxCard } from ".";
import { CheckboxCardArgs } from "./_types";
import { Field } from "../../field";
import { ReactComponent as SmartphoneIcon } from "../../../../assets/icons/smartphone.svg";
import { ReactComponent as SmartphoneActiveIcon } from "../../../../assets/icons/smartphone-active.svg";
import { Grid } from "../../../grid/grid";
import { Row } from "../../../grid/row";
import { Col } from "../../../grid/col";
import { Button } from "../../../buttons/button";
import { theme } from "../../../theme";

interface FormProps {
  cards: CheckboxCardArgs[];
  form: {
    onSubmit: (e: any) => void;
  };
}

const SingleTemplate: StoryFn<CheckboxCardArgs> = (args) => {
  return (
    <Field>
      <CheckboxCard
        {...args}
        name={"platform"}
        icon={<SmartphoneIcon />}
        iconActive={<SmartphoneActiveIcon />}
      ></CheckboxCard>
    </Field>
  );
};

export const SingleCard = SingleTemplate.bind({});
SingleCard.args = {
  indeterminate: false,
  disabled: false,
  defaultChecked: true,
  card: {
    isFloating: false,
  },
  label: "Smartphone",
  onToggle: (checked: boolean) => {
    console.log("Checkbox isChecked?", checked);
  },
};

const FormTemplate: StoryFn<FormProps> = (args) => {
  return (
    <form {...args.form}>
      <Grid>
        <Row>
          {args.cards.map((card) => (
            <Col>
              <Field>
                <CheckboxCard
                  {...card}
                  style={{ marginBottom: theme.space.sm }}
                />
              </Field>
            </Col>
          ))}
        </Row>
        <Row style={{ textAlign: "center", marginTop: theme.space.md }}>
          <Col size={12}>
            <Field>
              <Button type="submit" isPrimary>
                Submit
              </Button>
            </Field>
          </Col>
        </Row>
      </Grid>
    </form>
  );
};

export const MultipleCards = FormTemplate.bind({});
MultipleCards.args = {
  cards: [
    {
      disabled: false,
      card: {
        isFloating: false,
      },
      label: "Smartphone",
      icon: <SmartphoneIcon />,
      iconActive: <SmartphoneActiveIcon />,
      value: "smartphone",
      name: "platform",
    },
    {
      disabled: false,
      card: {
        isFloating: false,
        isDisabled: true,
      },
      label: "Tablet",
      icon: <SmartphoneIcon />,
      iconActive: <SmartphoneActiveIcon />,
      value: "tablet",
      name: "platform",
    },
    {
      disabled: false,
      card: {
        isFloating: false,
      },
      label: "Desktop",
      icon: <SmartphoneIcon />,
      iconActive: <SmartphoneActiveIcon />,
      value: "desktop",
      name: "platform",
    },
  ],
  form: {
    onSubmit: (e) => {
      e.preventDefault();
      let elements = e.target.elements;
      let checked = [];
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
          checked.push(elements[i].value);
        }
      }
      if (checked.length) alert("You have selected: " + checked.join(", "));
      return false;
    },
  },
};

export default {
  title: "Molecules/Forms/CheckboxCard",
  component: CheckboxCard,
  argTypes: {
    indeterminate: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
    iconActive: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof CheckboxCard>;
