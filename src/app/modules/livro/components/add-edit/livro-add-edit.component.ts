import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LivroService } from '../../services/livro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Livro } from '../../models/livro';
import { AutorService } from 'src/app/modules/autor/services/autor.service';
import { AssuntoService } from 'src/app/modules/assunto/services/assunto.service';
import { Assunto } from 'src/app/modules/assunto/models/assunto';
import { Autor } from 'src/app/modules/autor/models/autor';
import { FormaCompraService } from 'src/app/modules/forma-compra/services/formacompra.service';
import { FormaCompra } from 'src/app/modules/forma-compra/models/formacompra';
import { MatTableDataSource } from '@angular/material/table';
import { LivroFormaCompra } from '../../models/livroFormaCompra';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-livro-add-edit',
  templateUrl: './livro-add-edit.component.html',
  styleUrls: ['./livro-add-edit.component.css'],
})
export class LivroAddEditComponent implements OnInit {

  displayedColumns: string[] = [
    'descricao',
    'valor',
    'remover'
  ];

  dataSource!: MatTableDataSource<any>;

  livroForm: FormGroup;
  assuntos: Assunto[] = [];
  autores: Autor[] = [];
  formaCompras: FormaCompra[] = [];
  livroCompraForma: LivroFormaCompra[] = [];
  livro = new Livro();

  constructor(
    private livroService: LivroService,
    private autorService: AutorService,
    private assuntoService: AssuntoService,
    private formaCompraService: FormaCompraService,
    private dialogRef: MatDialogRef<LivroAddEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Livro,
    private snackBar: MatSnackBar,
  ) {
    this.livroForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      editora: ['', Validators.required],
      edicao: ['', Validators.required],
      anoPublicacao: ['', Validators.required],
      assuntos: ['', Validators.required],
      autores: ['', Validators.required],
      valor: [''],
      formaCompra: [],
    });
  }

  ngOnInit(): void {

    this.getAll();

    // this.livroForm.patchValue(this.data);       
  }

  load(): void {
    forkJoin(
      this.assuntoService.getAll(),
      this.autorService.getAll(),
      this.formaCompraService.getAll()
    ).subscribe(x => {
      if (this.data && this.data.codl) {
        this.getLivro(this.data.codl);
      }
    });
  }

  getLivro(codl: number): void {
    this.livroService.getById(codl).subscribe({
      next: (res) => {

        this.livro = res;
        // this.livroForm.value.titulo = this.livro.titulo;
        // this.livroForm.value.editora = this.livro.editora;
        // this.livroForm.value.edicao = this.livro.edicao;
        // this.livroForm.value.anoPublicacao = this.livro.anoPublicacao;
        // this.livroForm.value.autores = this.livro.autores;
        // this.livroForm.value.assuntos = this.livro.assuntos;
        // this.livroCompraForma = this.livro.livroFormaCompra;

        //this.livroForm.patchValue(this.livro); 

      },
      error: (err) => {
      },
    });
  }

  addFormaCompra(): void {

    let msg = "";

    if (!this.livroForm.value.formaCompra || !this.livroForm.value.valor) {
      msg = "Obrigatório selecionar uma forma de compra e informar o valor";
    }

    if (msg.length === 0) {
      let exists = this.livroCompraForma.filter((item, index) => item.codFor === this.livroForm.value.formaCompra.codFor);
      if (exists && exists.length > 0) {
        msg = "Forma de compra já adicionada";
      }
    }

    if (msg.length > 0) {

      this.snackBar.open(msg, '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });

      return;
    }

    let formaCompra = new LivroFormaCompra();
    formaCompra.codFor = this.livroForm.value.formaCompra.codFor;
    formaCompra.descricao = this.livroForm.value.formaCompra.descricao;
    formaCompra.valor = this.livroForm.value.valor;

    this.livroCompraForma.push(formaCompra);

    this.dataSource = new MatTableDataSource(this.livroCompraForma);
  }

  deleteFormaCompra(obj: LivroFormaCompra): void {
    this.livroCompraForma = this.livroCompraForma.filter((item, index) => item.codFor !== obj.codFor);
    this.dataSource = new MatTableDataSource(this.livroCompraForma);
  }

  getAll() {
    this.autorService.getAll().subscribe({
      next: (res) => {
        this.autores = res;

        this.formaCompraService.getAll().subscribe({
          next: (res) => {
            this.formaCompras = res;

            this.assuntoService.getAll().subscribe({
              next: (res) => {
                this.assuntos = res;

                if (this.data && this.data.codl) {

                  this.livroService.getById(this.data.codl).subscribe({
                    next: (res) => {

                      this.livro = res;
                      this.livroCompraForma = this.livro.livroFormaCompra;
                      this.dataSource = new MatTableDataSource(this.livroCompraForma);

                    },
                    error: (err) => {
                    },
                  });

                }
              },
              error: (err) => {
              },
            });
          },
          error: (err) => {
          },
        });
      },
      error: (err) => {
      },
    });
  }

  getAutor() {
    this.autorService.getAll().subscribe({
      next: (res) => {
        this.autores = res;
      },
      error: (err) => {
      },
    });
  }

  getFormaCompra() {
    this.formaCompraService.getAll().subscribe({
      next: (res) => {
        this.formaCompras = res;
      },
      error: (err) => {
      },
    });
  }

  getAssunto() {
    this.assuntoService.getAll().subscribe({
      next: (res) => {
        this.assuntos = res;
      },
      error: (err) => {
      },
    });
  }

  save(): void {

    if (this.livroCompraForma === null || this.livroCompraForma === undefined || this.livroCompraForma.length === 0) {

      this.snackBar.open('Obrigatório adicionar forma(s) de compra', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });

      return;
    }

    if (this.livroForm.valid) {

      let objLivro = {
        codl: this.data ? this.data.codl : 0,
        titulo: this.livroForm.value.titulo,
        editora: this.livroForm.value.editora,
        edicao: this.livroForm.value.edicao,
        anoPublicacao: this.livroForm.value.anoPublicacao,
        autores: this.livroForm.value.autores,
        assuntos: this.livroForm.value.assuntos,
        livroFormaCompra: this.livroCompraForma
      };

      if (this.data) {
        this.livroService
          .update(this.data.codl, objLivro)
          .subscribe({
            next: (val: any) => {

              this.snackBar.open('Salvo com sucesso !', '', {
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
        this.livroService.add(objLivro).subscribe({
          next: (val: any) => {

            this.snackBar.open('Salvo com sucesso !', '', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });

            this.livroForm.reset();
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