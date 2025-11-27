import { Routes } from '@angular/router';
import { ListaUsuarios } from './paginas/lista-usuarios/lista-usuarios';

export const routes: Routes = [
    {path: 'usuarios', component: ListaUsuarios},
    {path: '', redirectTo: 'usuarios', pathMatch: 'full'},
    {path: '**', redirectTo: ''},
];
