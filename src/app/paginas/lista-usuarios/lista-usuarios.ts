import { Component } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Console } from 'console';

@Component({
  selector: 'app-lista-usuarios',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.scss',
})
export class ListaUsuarios {

  private http = inject(HttpClient);
  private urlApi = "https://randomuser.me/api/"
  listaUsuarios: any = [];
  CLAVE_ALMACEN: string = "lista_auditoria";

  obtenerNUsuarios(numero: number): Observable<Usuario[]> {
    return this.http.get<any>(this.urlApi+"?results="+numero);
  };

  guardarUsuarios(): void {
    const numeroUsuariosInput = (document.querySelector('input[name="nombre"]') as HTMLInputElement);
    const numeroUsuarios = Number(numeroUsuariosInput.value);
    this.obtenerNUsuarios(numeroUsuarios).subscribe((datos: any) => {
      this.listaUsuarios = datos.results;
      console.log("Datos",this.listaUsuarios); })
  };

  cargarUsuarios() {
    const texto = localStorage.getItem(this.CLAVE_ALMACEN);
    if (texto == null) return []; 
    try {
      const dato = JSON.parse(texto);
      if (Array.isArray(dato)) {
          return dato;
        } else {
          return [];
        }
    } 
    catch (e) {
      console.error("Error:", e);
      return [];
    }
  };

}



