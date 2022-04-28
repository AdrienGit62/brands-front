import { BrandsFormData } from '../../../core/models/brandsFormData';
import { BrandsFormComponent } from '../../components/brands-form/brands-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandsService } from '../../services/brands.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Brands } from 'src/app/core/models/brands';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-brands-details',
  templateUrl: './brands-details.component.html',
  styleUrls: ['./brands-details.component.scss'],
})
export class BrandsDetailsComponent implements OnInit {
  brands$: Observable<Brands>;
  constructor(
    private _brandsService: BrandsService,
    private _activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.fetchData(params['id']);
    });
  }

  fetchData(id: number) {
    this.brands$ = this._brandsService.getById(id);
  }

  updateBrands(brands: Brands) {
    const brandsFormData: BrandsFormData = {
      isUpdateMode: true,
      brandsToUpdate: brands,
    };

    const dialogRef = this._dialog.open(BrandsFormComponent, {
      data: brandsFormData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchData(result);
      }
    });
  }

  deleteBrands(id: number) {
    this._brandsService.delete(id).subscribe((response) => {
      this._snackBar.open(response, '', {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-accent'],
      });

      this._router.navigateByUrl('/brands');
    });
  }

  goBack() {
    this._location.back();
  }
}
