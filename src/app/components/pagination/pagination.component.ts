import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})

export class PaginationComponent implements OnInit {
  isPrevDisabled: boolean = false;
  isNextDisabled: boolean = false;
  @Output() updatePageNumber = new EventEmitter<number>();
  @Input() lastPage: boolean;
  @Input() currentPageNumber: number;

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  constructor() { }

  ngOnInit(): void {
    this.isNextDisabled = this.lastPage;
    if (this.currentPageNumber == 1) {
      this.isPrevDisabled = true;
    }
  }

  handleClick(Action: string) {
    if (Action == "Next") {
      this.currentPageNumber++;
      this.updatePageNumber.emit(this.currentPageNumber);
    } else {
      if (this.currentPageNumber > 1) {
        this.currentPageNumber--;
        this.updatePageNumber.emit(this.currentPageNumber);
      }
    }
  }
}
