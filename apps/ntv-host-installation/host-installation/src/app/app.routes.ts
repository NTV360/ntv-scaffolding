import { Route } from '@angular/router';
import { FlowContainer } from './installation-flow/flow-container/flow-container';

export const appRoutes: Route[] = [
  {
    path: '',
    component: FlowContainer,
    children: [
      // Add child routes here for different installation steps
    ]
  }
];
