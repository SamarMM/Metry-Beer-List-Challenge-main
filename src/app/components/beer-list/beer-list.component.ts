import { Component, OnInit } from '@angular/core';
import { BeerService } from 'src/app/services/beer.service';
import { Beer } from 'src/app/interfaces/beer';
import { Observable , of} from 'rxjs';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.sass']
})
export class BeerListComponent implements OnInit {
  beers: Beer[];
  currentPageNumber: number = 1;
  pageLength: number = 10;
  lastPage:boolean = false;
  searchKeyValue: any = "";
  loaderImage = "../../../assets/Loader.svg";
  noDataImage = "../../../assets/NoData.png";
  loaderDisplay: string = "block";
  listDisplay: string = "none";
  noDataDisplay: string = "none";
  serverCallFinished: boolean = false;

  constructor(private beerService: BeerService) {
  }

  ngOnInit(): void {
    this.searchKeyValue = new URL(window.location.href).searchParams.get("SearchKey");
    if(this.searchKeyValue != null){
      this.searchKeyValue = this.searchKeyValue.replaceAll('_', ' ');
    }
    this.updatePage(this.currentPageNumber)
  }

  updatePage(PageNumber: number) {
    this.currentPageNumber = PageNumber;
    this.updateSearch({ searchKey: this.searchKeyValue, pageNumber: this.currentPageNumber });
  }

  updateSearch(searchParameters: any) {
    this.listDisplay = "none";
    this.noDataDisplay = "none";
    this.loaderDisplay = "block";
    this.serverCallFinished = false;
    this.currentPageNumber = searchParameters.pageNumber;
    this.searchKeyValue = searchParameters.searchKey == "" ? null : searchParameters.searchKey;
    this.beerService.getBeerList(this.searchKeyValue, this.currentPageNumber, this.pageLength).subscribe((beerslist: Beer[]) => {
      this.loaderDisplay = "none";
      if (beerslist.length > 0) {
        this.lastPage = beerslist.length < this.pageLength ? true : false;
        this.beers = beerslist;
        this.listDisplay = "block";
      } else {
        this.noDataDisplay = "flex";
      }
      this.serverCallFinished = true;
    });
  }
}