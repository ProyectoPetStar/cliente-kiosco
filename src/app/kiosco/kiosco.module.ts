import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal/portal.component';
import { RouterModule, Routes } from '@angular/router';

const routesKiosco: Routes = [
  { path: '', component: PortalComponent },
  { path: 'portal', component: PortalComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routesKiosco)
  ],
  declarations: [PortalComponent]
})
export class KioscoModule { }
