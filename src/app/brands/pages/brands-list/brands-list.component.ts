import { Brands } from '../../../core/models/brands';
import { max, Observable, of } from 'rxjs';
import { BrandsService } from '../../services/brands.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BrandsFormComponent } from '../../components/brands-form/brands-form.component';
import { BrandsFormData } from 'src/app/core/models/brandsFormData';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss'],
})
export class BrandsListComponent implements OnInit {
  brands$: Observable<Brands[]>;
  displayedColumns: string[] = ["id", "brand_name", "creator_fullname"];

  //Bidouille
  ids: number[] = [];

  constructor(
    private _brandsService: BrandsService,
    private _router: Router,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.brands$ = this._brandsService.get();
  }

  showBrandsDetails(brands: Brands) {
    this._router.navigateByUrl('/brands/' + brands.id);
  }

  createBrands() {
    const brandsFormData: BrandsFormData = {
      isUpdateMode: false,
      idToCreate: Math.max(...this.ids) + 1,
    };

    const dialogRef = this._dialog.open(BrandsFormComponent, {
      data: brandsFormData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetchData();
    });
  }

  setId(id: number) {
    //Bidouille
    this.ids.push(id);
  }
}
