"use strict";(self.webpackChunkMuslimNameCheck=self.webpackChunkMuslimNameCheck||[]).push([[621],{621:(N,u,r)=>{r.r(u),r.d(u,{ResultsComponent:()=>x});var h=r(861),m=r(805);function c(l,n){const i="object"==typeof n;return new Promise((e,a)=>{let o,s=!1;l.subscribe({next:L=>{o=L,s=!0},error:a,complete:()=>{s?e(o):i?e(n.defaultValue):a(new m.K)}})})}var t=r(223),p=r(520),g=r(808);function f(l,n){if(1&l&&(t.TgZ(0,"div",4),t.TgZ(1,"div",5),t._uU(2,"check"),t.qZA(),t.TgZ(3,"div"),t.TgZ(4,"b"),t._uU(5),t.qZA(),t._uU(6," is (most likely) a "),t.TgZ(7,"b"),t._uU(8),t.qZA(),t._uU(9," name"),t.qZA(),t.qZA()),2&l){const i=t.oxw().$implicit;t.xp6(5),t.Oqu(i.name),t.xp6(3),t.hij("",i.isSunni?"Sunnni":"Shia"," Muslim")}}function d(l,n){if(1&l&&(t.TgZ(0,"div",6),t.TgZ(1,"div",5),t._uU(2,"close"),t.qZA(),t.TgZ(3,"div"),t.TgZ(4,"b"),t._uU(5),t.qZA(),t._uU(6," is (most likely) not a Muslim name"),t.qZA(),t.qZA()),2&l){const i=t.oxw().$implicit;t.xp6(5),t.Oqu(i.name)}}function v(l,n){if(1&l&&(t.ynx(0),t.YNc(1,f,10,2,"div",2),t.YNc(2,d,7,1,"div",3),t.BQk()),2&l){const i=n.$implicit;t.xp6(1),t.Q6J("ngIf",i.isMuslim),t.xp6(1),t.Q6J("ngIf",!i.isMuslim)}}let x=(()=>{class l{constructor(i){this.httpClient=i,this.whiteList=[],this.blackList=[],this.shiaList=[],this.shiaRegex=[],this.results=[]}initializeNames(){var i=this;return(0,h.Z)(function*(){console.log("Initializing Names"),i.whiteList=(yield c(i.httpClient.get("assets/WhiteList.txt",{responseType:"text"}))).split("\r\n"),console.log("Loaded "+i.whiteList.length+" white list names"),i.blackList=(yield c(i.httpClient.get("assets/BlackList.txt",{responseType:"text"}))).split("\r\n"),console.log("Loaded "+i.blackList.length+" white list names");var e=(yield c(i.httpClient.get("assets/FilterList.txt",{responseType:"text"}))).split("\r\n");console.log("Loaded "+e.length+" shia list names"),e.forEach(a=>{var s=a.split("\t");"1"==s[1]?i.shiaRegex.push(s[0]):i.shiaList.push(s[0])})})()}checkName(i){this.results=[],i.replace("-"," ").replace(","," ").replace(";"," ").replace(":"," ").split(" ").forEach(e=>{var a=this.preProcessName(e);if(1!=a.length&&null!==a&&null===a.match(/^ *$/)){var s=this.checkMuslimOrNot(a),o=this.checkShiaOrNot(a);this.results.push(new y(a,s||o,!o))}})}checkMuslimOrNot(i){console.log("Checking name : "+i);var e=i;if(this.blackList.find(s=>s==e))return console.log(e+" is in black list file. Verdict => Not a Muslim"),!1;if(e.match(/^m[aeou]hh?[aeou]?mm?[aeou][dt]/))return console.log(e+" matches 'Muhammad' variations. Verdict => Muslim"),!0;if(e.match(/^((acdi)|(abd))/))return console.log(e+" matches 'Abd' variations. Verdict => Muslim"),!0;if(e.match(/^d?zul/))return console.log(e+" matches 'Zul' variations. Verdict => Muslim"),!0;if(e.match(/[aeiou]ll[oa]hi?$/))return console.log(e+" matches '-allah' variations. Verdict => Muslim"),!0;if(e.match(/[ou]lla$/))return console.log(e+" matches 'ulla' variations. Verdict => Muslim"),!0;if(null!=this.whiteList.find(s=>s==e))return console.log(e+" is in White List. Verdict => Muslim"),!0;var a=e;return(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=e.replace(/i{2,}/g,"i")).replace(/u{2,}/g,"u")).replace(/b{2,}/g,"b")).replace(/c{2,}/g,"c")).replace(/d{2,}/g,"d")).replace(/f{2,}/g,"f")).replace(/g{2,}/g,"g")).replace(/h{2,}/g,"h")).replace(/j{2,}/g,"j")).replace(/k{2,}/g,"k")).replace(/l{2,}/g,"l")).replace(/q{2,}/g,"q")).replace(/r{2,}/g,"r")).replace(/s{2,}/g,"s")).replace(/t{2,}/g,"t")).replace(/m{2,}/g,"m")).replace(/n{2,}/g,"n")).replace(/v{2,}/g,"v")).replace(/w{2,}/g,"w")).replace(/x{2,}/g,"x")).replace(/y{2,}/g,"y")).replace(/z{2,}/g,"z"))!==a&&null!=this.whiteList.find(s=>s==e)?(console.log(i+" is in white list after stripping double characters transforming to '"+e+"'. Verdict => Muslim"),!0):(a=e,(e=(e=(e=(e=(e=(e=e.replace(/^[ae]l(?![aeiou])/g,"")).replace(/^[ae]b(([ou])|(uu)|(ou)|(oo))(?![aeiou])/g,"i")).replace(/^ei/g,"i")).replace(/[uo]((din)|(ddin))$/g,"i")).replace(/((ovic)|(ovich)|(ova)|(wati)|(waty)|(watie)|(zada))$/g,"i")).replace(/dz/g,"z"))!==a&&null!=this.whiteList.find(s=>s==e)?(console.log(i+" is in white list after transforming to '"+e+"'. Verdict => Muslim"),!0):(a=e,(e=(e=(e=(e=e.replace(/x(?=[aeiou])/g,"h")).replace(/(?<=[aeiou])x/g,"h")).replace(/aa/g,"a")).replace(/uu/g,"u"))!==a&&null!=this.whiteList.find(s=>s==e)?(console.log(i+" is in white list after applying Somali name transformation transforming into '"+e+"'. Verdict => Muslim"),!0):(a=e,(e=e.replace(/j(?=[aeiou])/g,"g"))!==a&&null!=this.whiteList.find(s=>s==e)?(console.log(i+" is in white list after applying Egyption (j=>g) rule transforming into '"+e+"'. Verdict => Muslim"),!0):(console.log(i+" is NOT in white list after applying all rules (Last transformed into '"+e+"'). Verdict => Not a Muslim Name"),!1))))}preProcessName(i){var e=i.normalize("NFD").replace(/\p{Diacritic}/gu,"");return(e=(e=(e=(e=e.toLocaleLowerCase()).replace("-","")).replace("'","")).replace("`","")).replace('"',"")}checkShiaOrNot(i){console.log("Checking if '"+i+"' is a Shia name");for(let e of this.shiaRegex)if(i.match(new RegExp(e,"g")))return console.log("Name matches Regex Test '"+e+"'.  Verdict => Shia name"),!0;for(let e of this.shiaList)if(i===e)return console.log("Name matches '"+e+"'. Verdict => Shia name"),!0;return console.log("Name '"+i+"' does not match any Shia name/rules. Verdict => Not a Shia name"),!1}}return l.\u0275fac=function(i){return new(i||l)(t.Y36(p.eN))},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-results"]],decls:2,vars:1,consts:[[1,"d-flex","flex-column","align-items-center"],[4,"ngFor","ngForOf"],["class","text-success d-flex justify-content-center",4,"ngIf"],["class","text-danger d-flex justify-content-center",4,"ngIf"],[1,"text-success","d-flex","justify-content-center"],[1,"material-icons"],[1,"text-danger","d-flex","justify-content-center"]],template:function(i,e){1&i&&(t.TgZ(0,"div",0),t.YNc(1,v,3,2,"ng-container",1),t.qZA()),2&i&&(t.xp6(1),t.Q6J("ngForOf",e.results))},directives:[g.sg,g.O5],styles:[""]}),l})();class y{constructor(n,i,e){this.name="",this.isMuslim=!1,this.isSunni=!1,this.name=n,this.isMuslim=i,this.isSunni=e}}}}]);