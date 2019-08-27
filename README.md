# Vue framework presentation

## What is Vue.js?
Vue egy a jelenlegi 3 nagy monolith frontend frameworkök közül. A többitől eltérően viszont elsődleges céljának a fokozatos adaptálást tűzte ki. Azaz a core működése a megjelenítési rétegre fokuszál, amely könnyen tanulhatóvá teszi és könnyen integrálható bármelyik akár már létező projektbe. Viszont ugyan úgy képes nagyobb volumenű projektek kezelésére is néhány kiegészítéssel és lib(könyvtárral) hozzáadásával.

## Getting started
Akkor vágjunk is bele. Egyik opciónk a Vue.js használatára, hogy egy CDN-ről betöltjük a Vue könyvtárat vagy letöltjük és a projektünkbe tesszük a vue.js fájlt. Ezáltal akármilyen projektben használhatjuk azt.

``` javascript
var app = new Vue({
  el: '#app'
});
```

Ezzel létrehoztunk egy Vue példányt, ami az 'app' id-val rendelkező elemre fog felkapcsolódni.

``` html
<div id="app">
</div>
```

### Data

Az első dolog, amit csinálhatunk az appunkkal, hogy adatot tárolunk benne, amit meg is akarunk jeleníteni. Erre használjuk az app példány data mezőjét:

``` javascript
var app = new Vue({
  el: '#app',
  data: {
    title: 'Todos'
  }
});
```

Ezt, ha meg szeretnénk jeleníteni a DOM-ban, akkor dupla kapcsos zárójel között (amit mustache-nek is neveznek) bármilyen javascript kifejezést használhatunk így a data-nkra is hivatkozhatunk.

``` html
<div id="app">
  <h1>{{ title }}</h1>
</div>
```

Ezzel kész is az első Vue app-unk. Elég egyszerűnek tűnhet, de sokmindent elintézett a framework a motorháztető alatt. A legfontosabb ezek közül, hogy a DOM és az appunk data mezője reaktív módon össze lett kötve. Mindez azért, mert mustashe az egyirányú adatkötést jelöli. Azaz, ha az **app.title** értékét megváltoztatjuk, - mondjuk a consoleból - akkor az új érték kerül megjelenítésre. Ezt text interpolációnak is szokták hívni.

Viszont nem csak szöveget tudunk interpolálni, hanem gyakorlatlag bármelyik html attribútumot.

``` html
<div id="app"
  <h1 v-bind:title="message">
    {{ title }}
  </h1>
</div>
```
``` javascript
var app = new Vue({
  el: '#app',
  data: {
    title: 'Todos',
    message: 'You loaded this page on ' + new Date().toLocaleString()
  }
})
```

Itt láthatunk egy kifejezést a messageben. Ez az érték a Vue példány előállításakor értékelődik ki és nem számolódik újra, amíg nem érünk hozzá.

Ha olyan értéket szeretnénk megjeleníteni, ami más adatokból származtatott érték, akkor nem muszáj mindig kiírni az egészet hanem a componens computed mezőjében definiálhatunk ezekhez a számított értékekhez shorthandeket.

``` javascript
var app = new Vue({
  el: '#app',
  computed: {
    message () { return 'You loaded this page on ' + new Date().toLocaleString() }
  }
})
```
