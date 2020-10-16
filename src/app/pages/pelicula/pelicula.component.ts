import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits-response';
import { DetailsMovie } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: DetailsMovie;
  public cast: Cast[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private peliculasService: PeliculasService,
              private location: Location,
              private router: Router) { }

  ngOnInit() {
    const { id } = this.activatedRoute.snapshot.params
    combineLatest([
      this.peliculasService.getPeliculaDetails(id),
      this.peliculasService.getCast(id)
    ]).subscribe(([movie, cast]) => {
      // console.log(movie, cast);
      if (!movie) {
        this.router.navigateByUrl('/home')
        return
      }
      this.pelicula = movie
      this.cast = cast
    })
    // this.peliculasService.getPeliculaDetails(id).subscribe(movie => {
      // if (!movie) {
      //   this.router.navigateByUrl('/home')
      //   return
      // }
      // this.pelicula = movie
    // })
    // this.peliculasService.getCast(id).subscribe(cast => {
    //   this.cast = cast
    // })
  }

  regresar() {
    this.location.back()
    // Da informacion de la localizacion del usuario dentro de la aplicacion
  }

}
