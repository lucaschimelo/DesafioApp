
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssuntoAddEditComponent } from './components/add-edit/assunto-add-edit.component';
import { AssuntoService } from './services/assunto.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assunto',
  templateUrl: './assunto.component.html',
  styleUrls: ['./assunto.component.css']
})
export class AssuntoComponent implements OnInit {
   
  displayedColumns: string[] = [
    'codAs',
    'descricao',    
    'acoes'   
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private assuntoService: AssuntoService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AssuntoAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getList();
        }
      },
    });
  }

  getList() {
    this.assuntoService.getAll().subscribe({
      next: (res) => {
             
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;       
      },
      error: (err) => {
        
      },
    });
  }
 
  delete(id: number) {
    let confirm = window.confirm("Deseja remover o registro ?");
    if(confirm) {
      this.assuntoService.delete(id).subscribe({
        next: (res) => {
          
          this.snackBar.open('Removido com sucesso !','',{
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });

          this.getList();
        },
        error: (err) => {
          
        },
      });
    }
  }

  openEditDialog(data: any) {
    const dialogRef = this.dialog.open(AssuntoAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getList();
        }
      }
    });
  }
}