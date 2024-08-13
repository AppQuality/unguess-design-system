import { Meta, StoryFn } from "@storybook/react";
import { RadioCard } from ".";
import { RadioCardArgs } from "./_types";
import { Field } from "../../field";
import { ReactComponent as SmartphoneIcon } from "../../../../assets/icons/smartphone.svg";
import { ReactComponent as SmartphoneActiveIcon } from "../../../../assets/icons/smartphone-active.svg";
import { Grid } from "../../../grid/grid";
import { Row } from "../../../grid/row";
import { Col } from "../../../grid/col";
import { Button } from "../../../buttons/button";
import { theme } from "../../../theme";
import { useState } from "react";

interface FormProps {
  cards: RadioCardArgs[];
  form: {
    onSubmit: (e: any) => void;
  };
}

const SingleTemplate: StoryFn<RadioCardArgs> = (args) => {
  const [radioValue, setRadioValue] = useState("");

  const handleClick = (value: string) => {
    setRadioValue(value);
  };

  return (
    <Field>
      <RadioCard
        {...args}
        checked={radioValue === args.value}
        onChecked={handleClick}
      />
    </Field>
  );
};

export const SingleCard = SingleTemplate.bind({});
SingleCard.args = {
  disabled: false,
  card: {
    isFloating: false,
  },
  label: "Smartphone",
  value: "1",
  icon: <SmartphoneIcon />,
  iconActive: <SmartphoneActiveIcon />,
  name: "platform",
};

const FormTemplate: StoryFn<FormProps> = (args) => {
  const [radioValue, setRadioValue] = useState(args.cards[0].value);

  const handleClick = (value: string) => {
    setRadioValue(value);
  };

  return (
    <form {...args.form}>
      <Grid>
        <Row>
          {args.cards.map((card) => (
            <Col>
              <Field style={{ height: "100%" }}>
                <RadioCard
                  {...card}
                  checked={radioValue === card.value}
                  onChecked={handleClick}
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
      label: "Sito Web o Web App",
      icon: <SmartphoneIcon />,
      iconActive: <SmartphoneActiveIcon />,
      value: "webapp",
      name: "platform",
    },
    {
      disabled: false,
      card: {
        isFloating: false,
      },
      label: "Mobile App",
      icon: <SmartphoneIcon />,
      iconActive: <SmartphoneActiveIcon />,
      value: "mobileapp",
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
  title: "Molecules/Forms/RadioCard",
  component: RadioCard,
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
} as Meta<typeof RadioCard>;
