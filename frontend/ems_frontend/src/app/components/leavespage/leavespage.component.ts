import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavChangeEvent, NgbNavModule} from '@ng-bootstrap/ng-bootstrap'

// const NAVITEMS=[
//   {
//     sr:1,
//     title:'my leaves',
//     content:'xewfrtgh5hytjntkmiy,lkiumunjtgbvefdscwefwedxdws'
//   },
//   {
//     sr:2,
//     title:'Create leave',
//     content:'xewfrtgh5hyt  h byj   jtyjrt  hrty h b dg gfx r fdiumunjtgbvefdscwefwedxdws'
//   }
// ];

const items = [
  {
    id: 1,
    title: 'My Leaves',
    content: 'Raw denim you probably haven\'t heard of them jean shorts Austin. Nesciunt tofu stumptown...'
  },
  {
    id: 2,
    title: 'Create Leave',
    content: 'Exercitation +1 labore velit, blog sartorial PBR leggings next level...'
  },
  {
    id: 3,
    title: 'To be approved',
    content: 'Sed commodo, leo at suscipit dictum, quam est porttitor sapien, eget sodales nibh...'
  }
];

@Component({
  selector: 'app-leavespage',
  templateUrl: './leavespage.component.html',
  standalone:true,
  imports:[NgbNavModule,CommonModule],
})

export class LeavespageComponent  {
  items = items;
  active = 1;
  disabled = true;

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.active = 1;
    }
  }
}
