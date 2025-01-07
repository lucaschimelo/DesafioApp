
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LivroComponent } from './modules/livro/livro.component';
import { AutorComponent } from './modules/autor/autor.component';
import { AssuntoComponent } from './modules/assunto/assunto.component';

const appRoutes: Routes = [
    { path: 'livro', component: LivroComponent },
    { path: 'autor', component: AutorComponent },
    { path: 'assunto', component: AssuntoComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}