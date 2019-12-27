import { Component} from '@angular/core';

@Component({
  selector: 'app-rating-template',
  templateUrl: './rating-template.component.html',
  styles: [`
    .star {
      font-size: 1.5rem;
      color: #d1d2d4;
    }
    .filled {
      color: #ccc61a;
    }
    .bad {
      color: #deb0b0;
    }
    .medium {
      color: #7392cc;
    }
    .filled.bad {
      color: #ff1e1e;
    }
  `]
})
export class NgbdRatingTemplate {
  currentRate = 5;

 
}
