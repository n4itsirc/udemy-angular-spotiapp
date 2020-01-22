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
        Authorization: 'Bearer BQA8bUKsYCKGqy2wss5Pp6MIPaqzAuW6pUKZnrgQ4XVtQEwioOri3TgVVk2gWfV6ioyHt2aSK9K9a297HgE'
      });

      return this.http.get(url, {headers});
    }

   getNewReleases() {

    return this.getQuery(`browse/new-releases?country=CL&limit=20&offset=5`)
                .pipe( map( data => data[`albums`].items ) );
  }

  getArtistas(termino: string) {

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
                .pipe( map( data => data[`artists`].items ) );

  }

  getArtista(id: string) {

    return this.getQuery(`artists/${id}`);

  }

  getTopTracks(id: string) {

    return this.getQuery(`artists/${id}/top-tracks?country=CL`)
            .pipe( map( data => data[`tracks`]) );

  }
}
