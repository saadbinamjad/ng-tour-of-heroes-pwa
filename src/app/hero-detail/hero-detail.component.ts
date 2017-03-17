import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit{
  	constructor(
  		private heroService: HeroService,
  		private route: ActivatedRoute,
  		private location: Location		 
  	){}

   	@Input()
  	hero : Hero;

  	ngOnInit(): void{

		this.route.params.subscribe( params => {
			let id = +params['id'];
			this.heroService.getHero(id)
				.subscribe(hero => this.hero = hero);

		});  

  }
	save(): void{
    this.heroService.update(this.hero).subscribe(()=>this.goBack());
  }
	goBack(): void{
		this.location.back();
	}
}
