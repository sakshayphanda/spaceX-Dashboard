import { Component, OnInit } from '@angular/core';
import { API } from 'src/app/shared/enum/api.enum';
import { GlobalDataService } from '../../shared/services/global-data.service';
import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements OnInit {
  filters = new Map();
  API = API;
  constructor(
    public globalDataService: GlobalDataService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {}

  log() {
    console.log('Side bar root');
  }

  changeSelectedYear(event) {
    console.log(event);

    const year = event.target.id;
    this.filters.set(API.LAUNCH_YEAR, year);
    this.fetchFilteredData();
  }

  changeLandingFilter(value: boolean) {
    this.filters.set(API.LAND_SUCCESS, value);
    this.fetchFilteredData();
  }

  changeLaunchFilter(value: boolean) {
    this.filters.set(API.LAUNCH_SUCCESS, value);
    this.fetchFilteredData();
  }

  fetchFilteredData(reset?) {
    const URL = `${API.ALL_DATA}`;
    if (reset) {
      this.filters.clear();
      this.hitApi(URL);
      return;
    }
    const updatedURL = this.updateURL(URL);
    this.hitApi(updatedURL);
  }

  updateURL(URL) {
    if (this.filters.has(API.LAUNCH_YEAR)) {
      URL = URL + `&${API.LAUNCH_YEAR}=${this.filters.get(API.LAUNCH_YEAR)}`;
    }
    if (this.filters.has(API.LAND_SUCCESS)) {
      URL = URL + `&${API.LAND_SUCCESS}=${this.filters.get(API.LAND_SUCCESS)}`;
    }
    if (this.filters.has(API.LAUNCH_SUCCESS)) {
      URL =
        URL + `&${API.LAUNCH_SUCCESS}=${this.filters.get(API.LAUNCH_SUCCESS)}`;
    }
    return URL;
  }

  hitApi(URL) {
    console.log(URL);
    this.httpService.get(URL).subscribe((i) => {
      console.log(i);
      this.globalDataService.allData.next(i);
    });
  }
}
