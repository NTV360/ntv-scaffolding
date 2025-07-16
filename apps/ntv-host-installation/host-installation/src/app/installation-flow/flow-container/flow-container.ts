import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Layout } from '../../components/layout/layout';
import { Sidebar } from '../../components/layout/sidebar/sidebar';

@Component({
  selector: 'ntv-flow-container',
  imports: [CommonModule, RouterModule, Layout, Sidebar],
  templateUrl: './flow-container.html',
  styleUrl: './flow-container.css',
})
export class FlowContainer {}
