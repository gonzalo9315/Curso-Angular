import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) { }

  getQuery( query: string){

    const url = `https://api.spotify.com/v1/${ query}`;
    const headers = new HttpHeaders({

      'Authorization': 'Bearer BQCFmR8Ypj1wjn8sCjjjJYp98CXRrnqpEoG6kwslI7me5Lw4KVhLvLGwt5oljJrtfbWBL-CpXpoLQXuWlN8'
    });

    return this.http.get(url, { headers });
  }


  getNewReleases(){

    return this.getQuery('browse/new-releases').pipe( map( response => response['albums'].items ));
  }

  getArtistas( termino: string ){

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`).pipe( map( response => response['artists'].items ));
  }

  getArtista( id: string ){

    return this.getQuery(`artists/${id}`); // .pipe( map( response => response['artists'].items ));
  }

  getTopTraks( id: string ){

    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe( map( response => response['tracks']));
  }
}
