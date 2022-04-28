import { BrandsService } from '../../services/brands.service';
import { Brands } from '../../../core/models/brands';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrandsFormData } from 'src/app/core/models/brandsFormData';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-brands-form',
  templateUrl: './brands-form.component.html',
  styleUrls: ['./brands-form.component.scss'],
})
export class BrandsFormComponent implements OnInit {
  isUpdateMode: boolean;
  brandsForm: FormGroup;

  type_of_car: string[] = ["Luxe", "Sport", "Polyvalent"];
  constructor(
    private _formBuilder: FormBuilder,
    private _brandsService: BrandsService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<BrandsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BrandsFormData
  ) {
    this.isUpdateMode = this.data.isUpdateMode;
  }

  ngOnInit(): void {
    this.initFormBuilder();
  }

  initFormBuilder() {
    this.brandsForm = this._formBuilder.group({
      id: [
        this.data.isUpdateMode
          ? this.data.brandsToUpdate.id
          : this.data.idToCreate,
        Validators.required,
      ],
      brand_name: [
        this.data.isUpdateMode ? this.data.brandsToUpdate.brand_name : '',
        Validators.required,
      ],
      creator_fullname: [
        this.data.isUpdateMode ? this.data.brandsToUpdate.creator_fullname : '',
        Validators.required,
      ],
      type_of_car: [
        this.data.isUpdateMode ? this.data.brandsToUpdate.type_of_car : '',
        Validators.required,
      ],
      creationDate: [
        this.data.isUpdateMode ? this.data.brandsToUpdate.creationDate : '',
        Validators.required,
      ],
      contact_email: [
        this.data.isUpdateMode ? this.data.brandsToUpdate.contact_email : '',
        [Validators.required, Validators.email],
      ],
    });
  }

  closeForm(id?: number) {
    this.brandsForm.reset();
    this.dialogRef.close(id);
  }

  onSubmit(brands: Brands) {
    if (this.brandsForm.valid) {
      if (this.data.isUpdateMode) {
        // update
        this._brandsService.update(brands).subscribe((response) => {
          this.closeForm(brands.id);
          this._snackBar.open(response, '', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        });
      } else {
        // create
        this._brandsService.create(brands).subscribe((response) => {
          this.closeForm(brands.id);
          this._snackBar.open(response, '', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        });
      }
    }
  }
}
