import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  nameToCheck = '';
  searchDisable:boolean = false;
  checkButtonDisable:boolean = true;
  showLoading = false;
  resultsObtained:boolean=false;
  @ViewChild('resultsContainer', { read: ViewContainerRef }) resultsContainer!: ViewContainerRef;
  resultsComponent!: ResultsComponent;
  constructor(private route:ActivatedRoute, private router:Router, private location:Location) {}

  ngOnInit() {
    console.log('App Started');
    this.route.queryParams.subscribe(p=> {
      if (p['name'] != null) {
        this.nameToCheck = p['name'];
        this.checkClick();
      }
    })
  }

  resetApp() {
    this.nameToCheck = "";
    this.resultsComponent?.reset();
    this.checkButtonDisable = true;
    this.resultsObtained = false;
    this.updateUrl(this.nameToCheck);
  }

  nameToCheckChanged() {
    this.checkButtonDisable = this.nameToCheck == '';
  }

  async checkClick() {
    if (this.resultsComponent!=null) this.resultsComponent 
    this.searchDisable = true;
    this.showLoading = true;
    this.updateUrl(this.nameToCheck);
    if (this.resultsContainer.length===0) await this.loadResults(); 
    this.resultsComponent.checkName(this.nameToCheck);
    this.resultsObtained = this.resultsComponent.results.length>=0;
    this.showLoading=false;
    this.searchDisable= false;
    this.checkButtonDisable = true;
  }

  updateUrl(nameQuery:string) {
    const urlTree = this.router.createUrlTree([],{
      relativeTo: this.route,
      queryParams: nameQuery? { name: nameQuery } : null,
      queryParamsHandling: 'merge'
    });
    this.location.go(nameQuery? urlTree.toString() : "/");
  }

  async loadResults() {
    const { ResultsComponent } = await import('./results/results.component');
    this.resultsComponent = this.resultsContainer.createComponent(ResultsComponent).instance;
    await this.resultsComponent.initializeNames();
  }
  
}

function delay(ms: number) { return new Promise( resolve => setTimeout(resolve, ms)); }