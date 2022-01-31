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
  shiaList: string[] = [];
  shiaRegex: string[] = [];
  results: NameChecked[] = [];

  async initializeNames() {
    console.log('Initializing Names');
    var whiteListRaw = await lastValueFrom(this.httpClient.get('./assets/WhiteList.txt', {responseType: 'text'}));
    this.whiteList = whiteListRaw.split(/\r?\n/);
    console.log('Loaded ' + this.whiteList.length + ' white list names');
    var blackListRaw = await lastValueFrom(this.httpClient.get('./assets/BlackList.txt', {responseType: 'text'}));
    this.blackList = blackListRaw.split(/\r?\n/);
    console.log('Loaded ' + this.blackList.length + ' white list names');
    var filterListRaw = await lastValueFrom(this.httpClient.get('./assets/FilterList.txt', {responseType: 'text'}));
    var filterList = filterListRaw.split(/\r?\n/);
    console.log('Loaded ' + filterList.length + ' shia list names');
    filterList.forEach(e=> {
      var items = e.split('\t');
      if (items[1]=='1') this.shiaRegex.push(items[0]); else this.shiaList.push(items[0]);
    });
  }

  checkName(nameToCheck:string) {
    this.results = [];
    nameToCheck.replace("-"," ").replace(","," ").replace(";"," ").replace(":"," ").split(" ").forEach(nameRaw=> {
      var name = this.preProcessName(nameRaw);
      if (name.length==1 || name === null || name.match(/^ *$/) !== null) return;
      var isMuslim = this.checkMuslimOrNot(name);      
      var isShia = this.checkShiaOrNot(name); 
      this.results.push(new NameChecked(name,isMuslim || isShia,!isShia));
    });
  }

  checkMuslimOrNot(nameToCheckIn:string):boolean {

    console.log("Checking name : " + nameToCheckIn);
    var nameToCheck = nameToCheckIn;

    //Check black list
    if (this.blackList.find(e=>e == nameToCheck)) {
      console.log(nameToCheck + " is in black list file. Verdict => Not a Muslim")
      return false;
    }

    //Do quick checks
    if (nameToCheck.match(/^m[aeou]hh?[aeou]?mm?[aeou][dt]/)) {
      console.log(nameToCheck + " matches 'Muhammad' variations. Verdict => Muslim")
      return true;
    }
    if (nameToCheck.match(/^((acdi)|(abd))/)) {
      console.log(nameToCheck + " matches 'Abd' variations. Verdict => Muslim")
      return true;
    }
    if (nameToCheck.match(/^d?zul/)) { 
      console.log(nameToCheck + " matches 'Zul' variations. Verdict => Muslim")
      return true;
    }
    if (nameToCheck.match(/[aeiou]ll[oa]hi?$/)) { 
      console.log(nameToCheck + " matches '-allah' variations. Verdict => Muslim")
      return true;
    }
    if (nameToCheck.match(/[ou]lla$/)) {
      console.log(nameToCheck + " matches 'ulla' variations. Verdict => Muslim")
      return true;
    }

    //Whitelist Check
    if (this.whiteList.find(e=>e == nameToCheck) != null) {
      console.log(nameToCheck + " is in White List. Verdict => Muslim")
      return true;
    }

    //Any double+ letters, make it single and check again
    var nameToCheckBeforeTransformation = nameToCheck;
    nameToCheck = nameToCheck.replace(/i{2,}/g, "i");
    nameToCheck = nameToCheck.replace(/u{2,}/g, "u");
    nameToCheck = nameToCheck.replace(/b{2,}/g, "b");
    nameToCheck = nameToCheck.replace(/c{2,}/g, "c");
    nameToCheck = nameToCheck.replace(/d{2,}/g, "d");
    nameToCheck = nameToCheck.replace(/f{2,}/g, "f");
    nameToCheck = nameToCheck.replace(/g{2,}/g, "g");
    nameToCheck = nameToCheck.replace(/h{2,}/g, "h");
    nameToCheck = nameToCheck.replace(/j{2,}/g, "j");
    nameToCheck = nameToCheck.replace(/k{2,}/g, "k");
    nameToCheck = nameToCheck.replace(/l{2,}/g, "l");
    nameToCheck = nameToCheck.replace(/q{2,}/g, "q");
    nameToCheck = nameToCheck.replace(/r{2,}/g, "r");
    nameToCheck = nameToCheck.replace(/s{2,}/g, "s");
    nameToCheck = nameToCheck.replace(/t{2,}/g, "t");
    nameToCheck = nameToCheck.replace(/m{2,}/g, "m");
    nameToCheck = nameToCheck.replace(/n{2,}/g, "n");
    nameToCheck = nameToCheck.replace(/v{2,}/g, "v");
    nameToCheck = nameToCheck.replace(/w{2,}/g, "w");
    nameToCheck = nameToCheck.replace(/x{2,}/g, "x");
    nameToCheck = nameToCheck.replace(/y{2,}/g, "y");
    nameToCheck = nameToCheck.replace(/z{2,}/g, "z");

    if (nameToCheck !== nameToCheckBeforeTransformation && this.whiteList.find(e=>e == nameToCheck) != null) {
      console.log(nameToCheckIn + " is in white list after stripping double characters transforming to '" + nameToCheck + "'. Verdict => Muslim")
      return true;
    }

    //Strip out some muslim related name prefixes and try again
    nameToCheckBeforeTransformation = nameToCheck;
    nameToCheck = nameToCheck.replace(/^[ae]l(?![aeiou])/g, ""); //strip out arabic 'al','el'
    nameToCheck = nameToCheck.replace(/^[ae]b(([ou])|(uu)|(ou)|(oo))(?![aeiou])/g, "i"); //strip out 'abu' and all related
    nameToCheck = nameToCheck.replace(/^ei/g, "i"); //strip out '^ei' into 'i'
    nameToCheck = nameToCheck.replace(/[uo]((din)|(ddin))$/g, "i"); //strip out ends with 'uddin','oddin'
    nameToCheck = nameToCheck.replace(/((ovic)|(ovich)|(ova)|(wati)|(waty)|(watie)|(zada))$/g, "i"); //strip out ends with 'ovic','ovich','ova','wati'
    nameToCheck = nameToCheck.replace(/dz/g, "z"); //change dz to simply z
    if (nameToCheck !== nameToCheckBeforeTransformation && this.whiteList.find(e=>e == nameToCheck) != null) { 
      console.log(nameToCheckIn + " is in white list after transforming to '" + nameToCheck + "'. Verdict => Muslim")
      return true;
    }

    //Somali name mapping
    nameToCheckBeforeTransformation = nameToCheck;
    nameToCheck = nameToCheck.replace(/x(?=[aeiou])/g, "h"); // X is H in Somali
    nameToCheck = nameToCheck.replace(/(?<=[aeiou])x/g, "h"); // X is H in Somali
    nameToCheck = nameToCheck.replace(/aa/g, "a");
    nameToCheck = nameToCheck.replace(/uu/g, "u");
    if (nameToCheck !== nameToCheckBeforeTransformation && this.whiteList.find(e=>e == nameToCheck) != null) {
      console.log(nameToCheckIn + " is in white list after applying Somali name transformation transforming into '" + nameToCheck + "'. Verdict => Muslim")
      return true;
    }
    
    //Egyption name mapping
    nameToCheckBeforeTransformation = nameToCheck;
    nameToCheck = nameToCheck.replace(/j(?=[aeiou])/g, "g"); //Egyption J to G
    if (nameToCheck !== nameToCheckBeforeTransformation && this.whiteList.find(e=>e == nameToCheck) != null) {
      console.log(nameToCheckIn + " is in white list after applying Egyption (j=>g) rule transforming into '" + nameToCheck + "'. Verdict => Muslim")
      return true;
    }


    console.log(nameToCheckIn + " is NOT in white list after applying all rules (Last transformed into '" + nameToCheck + "'). Verdict => Not a Muslim Name")
    return false;
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

  
  checkShiaOrNot(nameToCheck:string): boolean {
    console.log("Checking if '" + nameToCheck + "' is a Shia name");
    for (let e of this.shiaRegex) {
      if (nameToCheck.match(new RegExp(e, "g"))) {
        console.log("Name matches Regex Test '" + e +"'.  Verdict => Shia name");
        return true;
      }
    }
    for (let e of this.shiaList) {
      if (nameToCheck ===e) {
        console.log("Name matches '" + e +"'. Verdict => Shia name");
        return true;
      }
    }

    console.log("Name '" + nameToCheck +"' does not match any Shia name/rules. Verdict => Not a Shia name");
    return false;
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


function escapeRegex(value:string) {
  return value.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" );
}