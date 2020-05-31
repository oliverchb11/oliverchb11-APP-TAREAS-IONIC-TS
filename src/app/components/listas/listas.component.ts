import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { DeseosService } from "src/app/services/deseos.service";
import { Lista } from "src/app/models/lista-model";
import { Router } from "@angular/router";
import { AlertController, IonList } from "@ionic/angular";

@Component({
  selector: "app-listas",
  templateUrl: "./listas.component.html",
  styleUrls: ["./listas.component.scss"],
})
export class ListasComponent {
  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;
  listas: Lista[] = [];
  constructor(
    public deseosServicio: DeseosService,
    private router: Router,
    public alertController: AlertController
  ) {}

  listaSelecionada(lista: Lista) {
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }
  emilinarLista(lista: Lista) {
    this.deseosServicio.borrarLista(lista);
  }
  async editarLista(lista: Lista) {
    const alert = await this.alertController.create({
      header: "Editar Tarea",
      inputs: [
        {
          name: "titulo",
          value: lista.titulo,
          placeholder: "titulo de la tarea",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            this.lista.closeSlidingItems();
          },
        },
        {
          text: "Editar",
          handler: (data) => {
            if (data.titulo.length === 0) {
              console.log("estas enviado algo vacio");
              return;
            } else {
              lista.titulo = data.titulo;
              this.deseosServicio.guardadStorage();
              this.lista.closeSlidingItems();
              console.log(data);
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
