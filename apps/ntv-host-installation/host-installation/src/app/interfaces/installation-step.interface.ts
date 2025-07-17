export interface InstallationStep {
  id: string;
  label: string;
  description?: string;
  completed?: boolean;
  active?: boolean;
  disabled?: boolean;
  error?: boolean;
}