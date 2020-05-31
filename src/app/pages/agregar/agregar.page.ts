import { Component, OnInit } from "@angular/core";
import { DeseosService } from "src/app/services/deseos.service";
import { ActivatedRoute } from "@angular/router";
import { Lista } from "src/app/models/lista-model";
import { ListaItem } from "src/app/models/lista-item-model";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.page.html",
  styleUrls: ["./agregar.page.scss"],
})
export class AgregarPage {
  listas: Lista;
  nombreItem: string;
  constructor(
    private deseosServicio: DeseosService,
    private routerAction: ActivatedRoute
  ) {
    const id = this.routerAction.snapshot.paramMap.get("listaId");

    this.listas = this.deseosServicio.obtenetLista(id);
    console.log(this.listas);
  }

  agregarItem() {
    console.log(this.nombreItem);
    if (this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.listas.items.push(nuevoItem);
    this.nombreItem = "";
    this.deseosServicio.guardadStorage();
  }

  cambioCheck(items: ListaItem) {
    const pendientes = this.listas.items.filter((item) => {
      return !item.completado;
    }).length;
    if (pendientes === 0) {
      this.listas.terminadaEn = new Date();
      this.listas.completada = true;
    } else {
      this.listas.terminadaEn = new Date();
      this.listas.completada = true;
    }
    this.deseosServicio.guardadStorage();
  }
  borrar(posicion: number) {
    this.listas.items.splice(posicion, 1);
    this.deseosServicio.guardadStorage();
  }
}
