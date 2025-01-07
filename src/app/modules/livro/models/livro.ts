import { LivroFormaCompra } from "./livroFormaCompra";

export class Livro {
    codl : number = 0;
    titulo : string | undefined;
    editora: string | undefined;
    edicao: number = 0;
    anoPublicacao : string | undefined;
    assuntos: [] = [];
    autores: [] = [];
    livroFormaCompra: LivroFormaCompra[] = [];
}
