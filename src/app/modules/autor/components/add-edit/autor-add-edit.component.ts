import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutorService } from '../../services/autor.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Autor } from '../../models/autor';

@Component({
  selector: 'app-autor-add-edit',
  templateUrl: './autor-add-edit.component.html',
  styleUrls: ['./autor-add-edit.component.css'],
})
export class AutorAddEditComponent implements OnInit {
  autorForm: FormGroup;

  constructor(
    private autorService: AutorService,
    private dialogRef: MatDialogRef<AutorAddEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Autor,
    private snackBar: MatSnackBar,
  ) {
    this.autorForm = this.formBuilder.group({
      nome: ['', Validators.required]    
    });
  }

  ngOnInit(): void {
    this.autorForm.patchValue(this.data);
  }

  save(): void{   

    if (this.autorForm.valid) {
      if (this.data) {
        this.autorService
          .update(this.data.codAu, this.autorForm.value)
          .subscribe({
            next: (val: any) => {
             
              this.snackBar.open('Salvo com sucesso !','',{
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'center'
              });

              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              alert("Error while updating the employee!");
            },
          });
      } else {
        this.autorService.add(this.autorForm.value).subscribe({
          next: (val: any) => {
           
            this.snackBar.open('Salvo com sucesso !','',{
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });

            this.autorForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {           
            alert("Error!");
          },
        });
      }
    }
  
  }

  
}