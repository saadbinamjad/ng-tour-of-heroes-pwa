import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Hero } from './hero';


@Injectable()
export class HeroSearchService {


  constructor(private http: Http) { }

  search(term: any) : Observable<Hero[]>{
  
  return this.http
            .get(`http://localhost:3000/heroes/?name_like=${term}`)
            .map((r: Response) => {
               	return r.json();
            });
  
  }
}
