import {Component, inject, Signal} from '@angular/core';
import {ContentFile, injectContent, injectContentFiles, MarkdownComponent} from "@analogjs/content";

import {ActivatedRoute} from "@angular/router";
import {FlyersAttributes} from "../../../content/flyers/flyer-attributes.model";
import {BlockAttributes} from "../../../content/blocks/block-attributes.model";
import {combineLatest} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";


@Component({
  standalone: true,
  imports: [MarkdownComponent],
  template: `
    <h1>Flyer: {{ flyerFile.attributes.title }}</h1>
    @for (block of blocks(); track block.slug) {
      <analog-markdown [content]="block.content"></analog-markdown>
    }
  `,
})
export default class FlyerDetailsPageComponent {

  readonly #snapshot = inject(ActivatedRoute).snapshot;
  protected readonly flyerFile = injectContentFiles<FlyersAttributes>((file) => file.slug === this.#snapshot.paramMap.get('flyerSlug'))[0];
  readonly #blockFiles = injectContentFiles((file) => this.flyerFile.attributes.blocks.includes(file.slug));
  protected readonly blocks: Signal<ContentFile<BlockAttributes>[]> = toSignal(combineLatest(this.#blockFiles.map((block) => {
    return injectContent<BlockAttributes>({
      customFilename: `blocks/${block.slug}`,
    })
  })));
}
