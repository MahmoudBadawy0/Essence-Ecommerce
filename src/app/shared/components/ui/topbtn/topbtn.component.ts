import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-topbtn',
  imports: [],
  templateUrl: './topbtn.component.html',
  styleUrl: './topbtn.component.scss',
})
export class TopbtnComponent {
  scroll: boolean = true;

  @HostListener('window:scroll') onWindowScroll() {
    if (scrollY > 30) {
      this.scroll = false;
    } else {
      this.scroll = true;
    }
  }
  scrollToTop() {
    window.scrollTo({ top: 1, behavior: 'smooth' });
  }
}
