import { Injectable } from "@angular/core";
import { Lista } from "../models/lista-model";

@Injectable({
  providedIn: "root",
})
export class DeseosService {
  listas: Lista[] = [];
  constructor() {
    this.crearStorage();
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardadStorage();
    return nuevaLista.id;
  }
  borrarLista(lista: Lista) {
    this.listas = this.listas.filter((listaData) => listaData.id !== lista.id);
    this.guardadStorage();
  }

  obtenetLista(id: number | string) {
    id = Number(id);
    return this.listas.find((listadata) => listadata.id === id);
  }

  guardadStorage() {
    localStorage.setItem("data", JSON.stringify(this.listas));
  }
  crearStorage() {
    if (localStorage.getItem("data")) {
      this.listas = JSON.parse(localStorage.getItem("data"));
    } else {
      this.listas = [];
    }
  }
}
