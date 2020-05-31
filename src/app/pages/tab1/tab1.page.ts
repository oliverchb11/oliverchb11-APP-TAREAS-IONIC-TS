import { Component } from "@angular/core";
import { DeseosService } from "src/app/services/deseos.service";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  tareas: any = {};
  constructor(
    public deseosServicio: DeseosService,
    private router: Router,
    public alertController: AlertController
  ) {}

  async agregarLista() {
    const alert = await this.alertController.create({
      header: "Nueva Tarea",
      inputs: [
        {
          name: "titulo",
          type: "text",
          placeholder: "Nombre de la tarea",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancelar");
          },
        },
        {
          text: "Crear",
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }
            const listaId = this.deseosServicio.crearLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          },
        },
      ],
    });

    alert.present();
  }
}
