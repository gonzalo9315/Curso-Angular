import { Component, OnInit, Input } from '@angular/core';
import { Lista } from '../../models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  listas: Lista[];
  @Input() terminada = true;

  constructor( private deseosServicio: DeseosService, private router: Router, public alertCtrl: AlertController ) {

    this.listas = deseosServicio.listas;
  }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ) {

    if ( this.terminada ) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  borrarLista( lista: Lista ) {

    this.deseosServicio.borrarLista( lista );
    this.listas = this.deseosServicio.listas;
  }

  async editarLista( lista: Lista) {

    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: `${ lista.titulo }`
      }
    ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Editar',
          handler: ( data ) => {
            console.log(data);
            if ( data.titulo.length === 0) {
              return;
            }

            lista.titulo = data.titulo;
            this.deseosServicio.guardarStorage();
          }
        }
      ]
    });

    alert.present();
  }
}
