import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { TopbtnComponent } from '../../shared/components/ui/topbtn/topbtn.component';

@Component({
  selector: 'app-blank',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, TopbtnComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss',
})
export class BlankComponent {}
