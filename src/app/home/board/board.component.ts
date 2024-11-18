import { Component } from '@angular/core';
// import { BoardComponent } from "./board/list/list.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ RouterOutlet],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

}
