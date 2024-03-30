import {Component} from '@angular/core';
import {injectContentFiles} from "@analogjs/content";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {FlyersAttributes} from "../../content/flyers/flyer-attributes.model";

@Component({
  selector: 'app-home', standalone: true, template: `
    <ul>
      <li><a href="about/">About</a></li>
      @for (flyers of flyers;track flyers.attributes.slug) {
        <a [routerLink]="['/flyers/', flyers.attributes.slug]">
          <h2>{{ flyers.attributes.title }}</h2>
        </a>
      }
    </ul>
  `, imports: [RouterLink, NgForOf]
})
export default class HomeComponent {
  readonly flyers = injectContentFiles<FlyersAttributes>((contentFile) => contentFile.filename.includes('/src/content/flyers/'));
}
