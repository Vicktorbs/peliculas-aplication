import { Component, HostListener, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[] = []
  public moviesSlideShow: Movie[] = []

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const position = (document.documentElement.scrollTop || document.body.scrollTop) + 900;
    const maxPosition = (document.documentElement.scrollHeight || document.body.scrollHeight);
    // console.log({position, maxPosition});
    if (position > maxPosition) {
      if (this.peliculasServices.cargando) { return }
      this.peliculasServices.getCartelera().subscribe(movies => {
        this.movies.push(...movies)
      })
    }
  }

  constructor(private peliculasServices: PeliculasService) { }

  ngOnInit(): void {

    this.peliculasServices.getCartelera().subscribe(movies => {
      // console.log(resp.results);
      this.movies = movies;
      this.moviesSlideShow = movies;
    })
  
  }

}
