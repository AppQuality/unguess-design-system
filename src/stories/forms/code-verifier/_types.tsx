export type CodeVerifierInputType = "alphanumeric" | "numeric";

export interface CodeVerifierArgs {
  length: number;
  type?: CodeVerifierInputType;
  validation?: "success" | "warning" | "error";
  disabled?: boolean;
  onComplete?: (code: string) => void;
  onChange?: (code: string) => void;
}
