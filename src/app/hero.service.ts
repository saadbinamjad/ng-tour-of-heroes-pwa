import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import './rxjs-operators';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';


@Injectable()
export class HeroService {

  private heroesUrl = 'http://localhost:3000/heroes/';

  private headers = new Headers({ 'Content-Type' : 'application/json' });

  constructor( private http: Http) { }

  getHeroes(): Observable<Hero[]> {
  	
    return this.http.get(this.heroesUrl)
    .map(response  => response.json());
  };

  getHero(id: number): Observable<Hero>{
  	 return this.http.get(this.heroesUrl + id)
    .map(response => response.json());
  }

  create(name: string): Observable<Hero>{
        

        let options = new RequestOptions ( { headers: this.headers });

        return this.http.post(this.heroesUrl, {name}, options)
          .map(this.extractData)
          .catch(this.handleError);

  }

  update(hero: Hero): Observable<Hero>{
        
    const url = `${this.heroesUrl}${hero.id}`;

    return this.http.put(url, JSON.stringify(hero), { headers: this.headers})
      .map(()=>hero).catch(this.handleError);


  }

  delete(id: number): Observable<void>{
    
    
    const url = `${this.heroesUrl}/${id}`;
 
    return this.http.delete( url, { headers : this.headers})
      .map(()=> null)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log(res);
    let body = res.json();
    return body || {};
  } 

  private handleError (error: Response | any){
       let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        //console.error(errMsg);
        return Observable.throw(errMsg);
      }
  }

