
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LivroAddEditComponent} from './components/add-edit/livro-add-edit.component';
import { LivroService } from './services/livro.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit {
   
  displayedColumns: string[] = [
    'codl',
    'titulo',
    'editora',
    'edicao',
    'anoPublicacao',
    'acoes'   
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private dialog: MatDialog,
    private livroService: LivroService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(LivroAddEditComponent, {
      height: '700px',
      width: '850px',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getList();
        }
      },
    });
  }

  getList() {
    this.livroService.getAll().subscribe({
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
      this.livroService.delete(id).subscribe({
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
    const dialogRef = this.dialog.open(LivroAddEditComponent, {
      data,
      height: '700px',
      width: '850px',
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