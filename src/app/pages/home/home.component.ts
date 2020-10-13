import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[] = []

  constructor(private peliculasServices: PeliculasService) { }

  ngOnInit(): void {

    this.peliculasServices.getCartelera().subscribe(resp => {
      // console.log(resp.results);
      this.movies = resp.results
    })
  
  }

}
