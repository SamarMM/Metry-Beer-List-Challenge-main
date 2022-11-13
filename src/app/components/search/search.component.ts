import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  @Output() updateSearch = new EventEmitter<{ searchKey: any, pageNumber: number }>();
  @Input() searchKey: string;
  faSearch = faSearch;
  searchItems: string[];

  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      this.Search()
    }
  }

  SuggestSearches(e: KeyboardEvent) {
    if (e.keyCode != 13) {
      let PreviousSearches: any = localStorage.getItem('RecentSearches');
      let PreviousSearchesArray: string[] = [];
      let target = e.target as HTMLInputElement;
      let inputValue: any = target.value;
      if (PreviousSearches != null) {
        PreviousSearchesArray = PreviousSearches.split(";");
        if (inputValue.replace(/^\s+|\s+$/gm, '') != "") {
          this.searchItems = [...new Set(PreviousSearchesArray)].reverse().slice(0, 5).filter(item => item.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) == 0);
        } else {
          this.searchItems = [];
        }
      }
    }else{
      this.searchItems = [];
    }
  }

  SetSearchValue(e: Event) {
    let target = e.target as HTMLInputElement;
    let selectedItemText: any = target.innerText;
    this.searchItems = [];
    this.searchKey = selectedItemText;
    this.Search();
  }

  Search() {
    let PreviousSearches: any = localStorage.getItem('RecentSearches');
    let SearchesArray: string = "";
    let modifiedSearchKey: string = this.searchKey.toLocaleLowerCase().replace(/^\s+|\s+$/gm, '').replaceAll(/ /g, '_');
    if (modifiedSearchKey != "") {
      var newURL: string = window.location.protocol + "//" + window.location.host + window.location.pathname + '?SearchKey=' + modifiedSearchKey;
      window.history.pushState({ path: newURL }, '', newURL);
      this.updateSearch.emit({ searchKey: this.searchKey, pageNumber: 1 });
      SearchesArray = PreviousSearches + this.searchKey.replace(/^\s+|\s+$/gm, '') + ";";
      localStorage.setItem('RecentSearches', SearchesArray);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
      this.updateSearch.emit({ searchKey: "", pageNumber: 1 });
    }
  }
}