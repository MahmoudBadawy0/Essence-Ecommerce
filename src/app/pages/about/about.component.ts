import { TranslatePipe } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
