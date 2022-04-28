import { BrandsService } from './services/brands.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BrandsComponent } from './brands.component';
import { BrandsDetailsComponent } from './pages/brands-details/brands-details.component';
import { BrandsFormComponent } from './components/brands-form/brands-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrandsListComponent } from './pages/brands-list/brands-list.component';

@NgModule({
  declarations: [
    BrandsComponent,
    BrandsListComponent,
    BrandsDetailsComponent,
    BrandsFormComponent,
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    SharedModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [BrandsService, MatDatepickerModule, MatNativeDateModule],
})
export class BrandsModule {}
