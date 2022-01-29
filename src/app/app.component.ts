import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MuslimNameCheck';
  namesToCheck = '';
  searchDisable:boolean = false;
  showLoading = false;

  emitNamesToCheck(el: any) {
    console.log(el.value);
    this.title=el.value || '';
  }

  checkClick() {
    console.log(this.namesToCheck);
    this.searchDisable = true;
    this.showLoading = true;

  }

  ngOnInit() {
    console.log('App Started');
  }

}
