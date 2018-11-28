import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal/portal.component';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const routesKiosco: Routes = [
  { path: '', component: PortalComponent },
  { path: 'portal', component: PortalComponent },
];

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    RouterModule.forChild(routesKiosco)
  ],
  declarations: [PortalComponent]
})
export class KioscoModule { }
