import { IWellProps } from "@zendeskgarden/react-notifications";
import { ReactComponent as CompletedIcon } from "../../assets/completed-status-round-icon.svg";
import { ReactComponent as OnGoingIcon } from "../../assets/on-going-status-round-icon.svg";
import { ReactComponent as ArrivalIcon } from "../../assets/arrival-status-round-icon.svg";

export interface CampaignCardsProps extends IWellProps {
  isNew?: boolean;
  date: string;
  title: string;
  subTitle: string;
  status: Status;
  testType: TestType;
}

export enum Status {
  COMPLETED = "COMPLETED",
  ON_GOING = "ON_GOING",
  ARRIVING = "ARRIVING"
}

export const statusIcons = {
  [Status.COMPLETED]: CompletedIcon,
  [Status.ON_GOING]: OnGoingIcon,
  [Status.ARRIVING]: ArrivalIcon,
}

export enum TestType  {
  REGRESSION_TEST = "Regression Testing",
  USABILITY_TEST = "Usability Test",
  FUNCTIONAL_TEST = "Functional Test"
}

