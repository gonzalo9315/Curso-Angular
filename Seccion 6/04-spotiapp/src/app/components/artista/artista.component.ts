import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent {

  artista: any = {};
  loading: boolean;
  topTraks: any[] = [];

  constructor( private router: ActivatedRoute, private spotify: SpotifyService) {

    this.loading = true;

    this.router.params.subscribe( params => {
      this.getArtista( params['id']);
      this.getTopTraks( params['id']);
      this.loading = false;
    });
   }

  getArtista( id: string ){

    this.spotify.getArtista( id ).subscribe( response => {
      console.log(response);
      this.artista = response;
    });
  }

  getTopTraks( id: string ){

    this.spotify.getTopTraks( id ).subscribe( response => {
      console.log(response);
      this.topTraks = response;
    });
  }
}
