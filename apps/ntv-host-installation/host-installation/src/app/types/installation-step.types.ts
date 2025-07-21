import { InstallationStep } from '../interfaces';

export type InstallationStepId = 'step1' | 'step2' | 'step3' | 'step4';

export interface InstallationStepWithTypedId extends InstallationStep {
  id: InstallationStepId;
}