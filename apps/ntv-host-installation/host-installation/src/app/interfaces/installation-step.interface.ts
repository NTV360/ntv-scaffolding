export interface InstallationStep {
  id: string;
  label: string;
  subtitle?: string;
  description?: string;
  completed?: boolean;
  active?: boolean;
  disabled?: boolean;
  error?: boolean;
}