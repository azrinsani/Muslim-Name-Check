import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResultsComponent } from './results/results.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MuslimNameCheck';
  nameToCheck = '';
  searchDisable:boolean = false;
  checkButtonDisable:boolean = true;
  showLoading = false;
  @ViewChild('resultsContainer', { read: ViewContainerRef }) resultsContainer!: ViewContainerRef;
  resultsComponent!: ResultsComponent;

  ngOnInit() {
    console.log('App Started');
  }

  emitNameToCheck(el: any) {
    this.nameToCheck=el.value || '';
    this.checkButtonDisable = this.nameToCheck == '';
  }

  async checkClick() {
    if (this.resultsComponent!=null) this.resultsComponent 
    this.searchDisable = true;
    this.showLoading = true;
    //await delay(1000);
    if (this.resultsContainer.length===0) await this.loadResults(); 
    this.resultsComponent.checkName(this.nameToCheck);
    this.showLoading=false;
    this.searchDisable= false;
    this.checkButtonDisable = true;
  }

  async loadResults() {
    const { ResultsComponent } = await import('./results/results.component');
    this.resultsComponent = this.resultsContainer.createComponent(ResultsComponent).instance;
    await this.resultsComponent.initializeNames();
  }
  
}

function delay(ms: number) { return new Promise( resolve => setTimeout(resolve, ms)); }