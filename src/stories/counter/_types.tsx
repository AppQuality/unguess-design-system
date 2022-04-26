import { TagArgs } from "../tags/_types";



export interface CounterArgs extends TagArgs {
  status: "progress" | "completed" | "incoming" | "functional" | "experiential";
  counter?: number;
}
