import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  constructor(private httpClient: HttpClient) { }

  whiteList: string[] = [];
  blackList: string[] = [];
  filterList: string[] = [];
  results: NameChecked[] = [];

  async initializeNames() {
    console.log('Initializing Names');
    this.whiteList = ( await lastValueFrom(this.httpClient.get('assets/WhiteList.txt', {responseType: 'text'}))).split('\r\n');
    this.blackList = ( await lastValueFrom(this.httpClient.get('assets/BlackList.txt', {responseType: 'text'}))).split('\r\n');
    console.log(this.blackList);
    this.filterList = ( await lastValueFrom(this.httpClient.get('assets/FilterList.txt', {responseType: 'text'}))).split('\r\n');

  }

  checkName(nameToCheck:string) {
    this.results = [];
    nameToCheck.replace("-"," ").replace(","," ").replace(";"," ").replace(":"," ").split(" ").forEach(name=> {
      if (name.length==1 || name === null || name.match(/^ *$/) !== null) return;
      var res = this.checkMuslimOrNot(name)      
      this.results.push(new NameChecked(name,res.isMuslim,res.isSunni));
    });
  }

  checkMuslimOrNot(nameToCheck:string):boolean  {
    var processedName = this.preProcessName(nameToCheck);
    console.log("Checking name : " + processedName);

    //Check black list
    if (this.blackList.find(e=>e == processedName)) {
      console.log(processedName + " is in Black List file. Verdict => Not a Muslim")
      return false;
    }

    //Do quick checks
    if (processedName.match(/^((acdi)|(abd))/)) return true;
    if (processedName.match(/^d?zul/)) return true;
    if (processedName.match(/[aeiou]ll[oa]hi?$/)) return true;
    if (processedName.match(/[ou]lla$/)) return true;

    //Whitelist Check
    if (!this.whiteList.find(e=>e == processedName)) return true;

    //Any double+ letters, make it single and check again
    processedName = processedName.replace(/i{2,}/g, "i");
    processedName = processedName.replace(/u{2,}/g, "u");
    processedName = processedName.replace(/b{2,}/g, "b");
    processedName = processedName.replace(/c{2,}/g, "c");
    processedName = processedName.replace(/d{2,}/g, "d");
    processedName = processedName.replace(/f{2,}/g, "f");
    processedName = processedName.replace(/g{2,}/g, "g");
    processedName = processedName.replace(/h{2,}/g, "h");
    processedName = processedName.replace(/j{2,}/g, "j");
    processedName = processedName.replace(/k{2,}/g, "k");
    processedName = processedName.replace(/l{2,}/g, "l");
    processedName = processedName.replace(/q{2,}/g, "q");
    processedName = processedName.replace(/r{2,}/g, "r");
    processedName = processedName.replace(/s{2,}/g, "s");
    processedName = processedName.replace(/t{2,}/g, "t");
    processedName = processedName.replace(/v{2,}/g, "v");
    processedName = processedName.replace(/w{2,}/g, "w");
    processedName = processedName.replace(/x{2,}/g, "x");
    processedName = processedName.replace(/y{2,}/g, "y");
    processedName = processedName.replace(/z{2,}/g, "z");
    if (!this.whiteList.find(e=>e == processedName)) return true;

    //Strip out some muslim related name prefixes and try again
    processedName = processedName.replace(/^[ae]l(?![aeiou])/g, ""); //strip out arabic 'al','el'
    processedName = processedName.replace(/^[ae]b(([ou])|(uu)|(ou)|(oo))(?![aeiou])/g, "i"); //strip out 'abu' and all related
    processedName = processedName.replace(/^ei/g, "i"); //strip out '^ei' into 'i'
    processedName = processedName.replace(/[uo]((din)|(ddin))$/g, "i"); //strip out ends with 'uddin','oddin'
    processedName = processedName.replace(/((ovic)|(ovich)|(ova)|(wati)|(waty)|(watie)|(zada))$/g, "i"); //strip out ends with 'ovic','ovich','ova','wati'
    processedName = processedName.replace(/dz/g, "z"); //change dz to simply z

    //Test Somali name rule
    
  }

  preProcessName(nameToProcess:string):string {
    
    //Remove diacritics
    var processedName = nameToProcess.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    
    //Preprocess
    processedName = processedName.toLocaleLowerCase();
    processedName = processedName.replace("-","");
    processedName = processedName.replace("'","");
    processedName = processedName.replace("`","");
    processedName = processedName.replace('"','');

    return processedName;
  }

}

class NameChecked {
  constructor(name:string, isMuslim:boolean, isSunni:boolean) {
    this.name = name;
    this.isMuslim = isMuslim;
    this.isSunni = isSunni;
  }
  name: string = '';
  isMuslim: boolean = false;
  isSunni: boolean = false;
}
