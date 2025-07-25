import { Route } from '@angular/router';
import { FlowContainer } from './installation-flow/flow-container/flow-container';

export const appRoutes: Route[] = [
  {
    path: '',
    component: FlowContainer
  }
];
