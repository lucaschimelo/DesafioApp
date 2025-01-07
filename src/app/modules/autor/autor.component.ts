
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AutorAddEditComponent } from './components/add-edit/autor-add-edit.component';
import { AutorService } from './services/autor.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {
   
  displayedColumns: string[] = [
    'codAu',
    'nome',    
    'acoes'   
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private autorService: AutorService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  downloadPdf(): void{
    this.autorService.downloadReportAlunoLivro().subscribe({
      next: (res) => {     
        debugger;
        const fileUrl = URL.createObjectURL(
          this.base64ToBlob(res.file, res.type)
        );    
        
        window.open(fileUrl);
       
      },
      error: (err) => {  
        debugger;      
      },
    });
  }

  base64ToBlob(b64Data : any, contentType: any){
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for(let offset = 0; offset < byteCharacters.length; offset +=512){
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for(let i = 0; i < slice.length; i++){
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays,{
      type: contentType ? contentType : 'application/pdf'
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AutorAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getList();
        }
      },
    });
  }

  getList() {
    this.autorService.getAll().subscribe({
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
      this.autorService.delete(id).subscribe({
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
    const dialogRef = this.dialog.open(AutorAddEditComponent, {
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