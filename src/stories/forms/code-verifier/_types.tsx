export type CodeVerifierInputType = "alphanumeric" | "numeric";

export interface CodeVerifierArgs {
  length: number;
  type?: CodeVerifierInputType;
  validation?: "success" | "warning" | "error";
  disabled?: boolean;
  value?: string;
  autoFocus?: boolean;
  onComplete?: (code: string) => void;
  onChange?: (code: string) => void;
}

export interface CodeVerifierRef {
  reset: () => void;
  focus: () => void;
}
