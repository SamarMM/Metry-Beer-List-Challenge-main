import { Component, OnInit , Input} from '@angular/core';
import { Beer } from 'src/app/interfaces/beer';

@Component({
  selector: 'app-beer-item',
  templateUrl: './beer-item.component.html',
  styleUrls: ['./beer-item.component.sass']
})
export class BeerItemComponent implements OnInit {
  @Input () beerData:Beer;
  Image = "../../../assets/imagePlaceHolder.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
