import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsDetailsComponent } from './pages/brands-details/brands-details.component';
import { BrandsComponent } from './brands.component';
import { BrandsListComponent } from './pages/brands-list/brands-list.component';

const routes: Routes = [
  {
    path: '',
    component : BrandsComponent,
    children : [
      {
        path : '',
        component : BrandsListComponent
      },
      {
        path : ':id',
        component : BrandsDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
