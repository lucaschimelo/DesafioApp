import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssuntoService } from '../../services/assunto.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Assunto } from '../../models/assunto';

@Component({
  selector: 'app-assunto-add-edit',
  templateUrl: './assunto-add-edit.component.html',
  styleUrls: ['./assunto-add-edit.component.css'],
})
export class AssuntoAddEditComponent implements OnInit {
  assuntoForm: FormGroup;

  constructor(
    private assuntoService: AssuntoService,
    private dialogRef: MatDialogRef<AssuntoAddEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Assunto,
    private snackBar: MatSnackBar,
  ) {
    this.assuntoForm = this.formBuilder.group({
      descricao: ['', Validators.required]    
    });
  }

  ngOnInit(): void {
    this.assuntoForm.patchValue(this.data);
  }

  save(): void{   

    if (this.assuntoForm.valid) {
      if (this.data) {
        this.assuntoService
          .update(this.data.codAs, this.assuntoForm.value)
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
              alert("Error");
            },
          });
      } else {
        this.assuntoService.add(this.assuntoForm.value).subscribe({
          next: (val: any) => {
           
            this.snackBar.open('Salvo com sucesso !','',{
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });

            this.assuntoForm.reset();
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