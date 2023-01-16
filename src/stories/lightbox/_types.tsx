import { ModalArgs } from "../modals/_types";



export interface LightboxArgs extends Omit<ModalArgs, "isLarge" | "isExtraLarge"> {}
