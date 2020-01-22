import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify service listo');
   }

    getQuery(query: string) {
      const url = `https://api.spotify.com/v1/${query}`;

      const headers = new HttpHeaders({
        Authorization: 'Bearer BQCRJBBHIJ4G9wH-hGsLhGn5PfaIrBHFZBbCJc9UP2ebb7fXvm1H-hebjO8nmJHfut31Rwg0AUNucGKr7WM'
      });

      return this.http.get(url, {headers});
    }

   getNewReleases() {

    return this.getQuery(`browse/new-releases?country=CL&limit=20&offset=5`)
                .pipe( map( data => data[`albums`].items ) );
  }

  getArtista(termino: string) {

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
                .pipe( map( data => data[`artists`].items ) );

  }
}
