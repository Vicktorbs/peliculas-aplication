import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { CreditsResponse } from '../interfaces/credits-response';
import { DetailsMovie } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseURL: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: 'cd7741dfe31d6c74acf629d2aaba7fdd',
      language: 'es-Es',
      page: this.carteleraPage.toString()
    }
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${ this.baseURL }/movie/now_playing?`, { params: this.params }).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.carteleraPage += 1;
        this.cargando = false
      })
    )
  }

  buscarPeliculas(texto: string): Observable<Movie[]> {
    const params = {
      ...this.params, 
      page: '1', 
      query: texto, 
      include_adult:'false'
    };
    return this.http.get<CarteleraResponse>(`${ this.baseURL }/search/movie`, { params }).pipe(
      map(res => res.results)
    )
  }

  getPeliculaDetails(id: string) {
    return this.http.get<DetailsMovie>(`${ this.baseURL }/movie/${ id }`, {params: this.params}).pipe(
      catchError(err => of(null))
    )
  }

  getCast(id: string) {
    return this.http.get<CreditsResponse>(`${ this.baseURL }/movie/${ id }/credits`, {params: this.params}).pipe(
      map(resp => resp.cast),
      catchError(err => of([]))
    )
  }

}
