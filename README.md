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

### Conditionals and Loops

Kicsit izgalmasabb terület a feltételes megjelenítés és a ciklikus renderelés.

Mi van, ha több elemet akarunk kiírni egyszerre?

``` javascript
var app = new Vue({
  el: '#app',
  data: {
    task_list: [
      { done: true, text: 'Learn Javascript' },
      { done: false, text: 'Learn ES6' },
      { done: false, text: 'Learn Vue' },
      { done: false, text: 'Build something awesome!' }
    ]
  }
})
```

A **v-for** direktívával képesek vagyunk végigiterálni egy tömbön és az elemeit egyesével véve renderelni.

``` html
<div class="task" v-for="task in task_list">
  {{ task.done ? '✔' : '❌' }} {{ task.text }}
</div>
```

Ebben a példában már láthatunk is egy feltételt, viszont mi van ha nem szöveget, hanem DOM elemeket szeretnénk feltételesen megjeleníteni.

Erre a **v-if** direktívát tudjuk használni a következő képp.
Cseréljük le az emojikat fontawesome ikonokra:

``` html
<div class="task" v-for="task in task_list">
  <div class="checkbox">
    <i class="fa fa-check" v-if="task.done"></i>
  </div>
  <div class="text">{{ task.text }}</div>
  <i class="remove fa fa-times" title="Delete"></i>
</div>
```

### User Input

Ez eddig mind szép és jó, de még mindig nem tud a felhasználó semmit sem csinálni!
Szóval alakítsuk át az indikátor ikonunkat egy checkboxá. Ehhez event kezelőket kell megadnunk, amit a vue-n keresztül a v-on direktíva segítségével tehetünk. (valid alias: @)

``` html
<div class="task" v-for="task in task_list">
  <div class="checkbox" v-on:click="task.done = !task.done">
    <i class="fa fa-check" v-if="task.done"></i>
  </div>
  <div class="text">{{ task.text }}</div>
  <i class="remove fa fa-times" title="Delete"></i>
</div>
```

Ehhez a direktívához bármelyik vanilla DOM element eventet vagy saját custom eventekhez hozzáköthetjük.

### Two way data binding

Nézzünk meg egy másik példát. Tegyük lehetővé új task felvételét.
Ehhez először szükségünk lesz egy text input fieldre.
Ennek a tartalmát kellene nekünk majd gomb vagy enter lenyomására hozzáadnunk a listához.

Ehhez ideiglenesen tárolnunk kell az értékét, ezt tegyük a temp_task változóba.

``` javascript 
var app = new Vue({
  el: '#app',
  data: {
    temp_task: null,
    task_list: [
      { done: true, text: 'Learn Javascript' },
      { done: false, text: 'Learn ES6' },
      { done: false, text: 'Learn Vue' },
      { done: false, text: 'Build something awesome!' }
    ]
  }
})
```

Na most hogyha ezt a korábbi v-bind:value-val szeretnénk az inputhoz kötni az nem lesz jó nekünk, mert  az csak egy és úgy is rossz irányba köt. Ha a változó megváltozik az input tartalma is megváltozik, de ha az inputot módosítjuk a változó nem fog frissülni.

Erre találták ki a v-model direktívát, ami két irányú adatkötést eredményez.

``` html
<div class="task">
    <i class="add fa fa-plus" v-on:click="task_list.push({done: false, text:temp_task}); temp_task=null"></i>
    <input type="text" class="textinput" 
           v-model="temp_task"
           v-on:keyup.enter="task_list.push({done: false, text:temp_task}); temp_task=null"/>
</div>
```

### Methods

Kezd ezeknek az utasításoknak a beírása egy kicsit körülményes lenni. Szervezzük ki őket metódusokba!

A componens metódusait a **methods** mező alá gyűjtjük. Ezeken belül a data-ban tárolt értékeket a this kulcsszó után érhetjük el.

``` javascript
var app = new Vue({
  el: '#app',
  data: {
    temp_task: null,
    task_list: [
      { done: true, text: 'Learn Javascript' },
      { done: false, text: 'Learn ES6' },
      { done: false, text: 'Learn Vue' },
      { done: false, text: 'Build something awesome!' }
    ]
  },
  methods: {
    styleTask(task) {
      let styleClass = [];
      if(task.done) styleClass.push('done');
      return styleClass;
    },
    addTask() {
      this.todos.push({done: false, text:this.temp_task});
      this.temp_task=null;
    },
    switchTaskState(task) {
      task.done = !task.done;
    },
    removeTask(index) {
      this.task_list.splice(index, 1);
    }
  }
})
```

``` html
<div id="app">
    <div class="header">
      <h1>Todos</h1>
    </div>
    <div class="content">
      <div class="task-list">
        <div class="task" v-for="(task, index) in task_list"
          v-bind:class="styleTask(task)">
          <div class="checkbox" v-on:click="switchTaskState(task)">
            <i class="fa fa-check" v-if="task.done"></i>
          </div>
          <div class="text">{{ task.text }}</div>
          <i class="remove fa fa-times" title="Delete" v-on:click="removeTask(index)"></i>
        </div>
        <div class="task">
          <i class="add fa fa-plus" v-on:click="addTask()"></i>
          <input class="textinput" type="text" 
            v-model="temp_task"
            v-on:keyup.enter="addTask()"/>
        </div>
      </div>
    </div>
  </div>
```

### Vue Component

Eddig arról beszéltünk, hogy a Vue példány mi mindenre képes. Viszont szinte soha nem akarunk minden funkcionalitást egyetlen egy objektumra felaggatni elsősorban karbantarthatóság miatt.

Itt jön a képbe a Vue komponens, amik nagyon hasonlítanak a Vue app példányra és felhasználásukkal képesek vagyunk tehermentesíteni, emészthető egységekre felosztani kódunkat.

``` javascript
const task_item = {
  name: 'TaskItem',
  template: `<div 
    v-bind:class="styleTask()"
    v-on:click="switchTaskState()">
    <div class="checkbox">
      <i class="fa fa-check" v-if="task.done"></i>
    </div>
    <div class="text">{{ task.text }}</div>
    <i class="remove fa fa-times" v-on:clicks="remove()"></i>
  </div>`,
  props: [ 'task', 'index' ],
  methods: {
    ...
  }
}
```

Egy komponensnek van **neve**, ezt nem kötelező megadni, csak a debug toolban megjelenítendő neve.

Két egyedi mezője van: template és a props. A **template** feladata megadni, hogy amikor később hivatkozunk a komponensre mit rendereljünk. A **props** pedig egy paraméter listának fogható fel, melyet a komponenst használó komponens adhat meg úgy mintha egy html attributum lenne.

Ezen kívül az összes mezője egyezik a Vue példány mezőivel, így a későbbiekben említett mezőket ott is lehet használni.

#### Watchers

Change listenereket helyezhetünk az adatokra watchereken keresztül. Remek arra, hogy a szülőtől kapott property-k változására figyeljünk.

``` javascript
const task_item = {
  name: 'TaskItem',
  template: ...,
  props: [ 'task', 'index' ],
  watcher: {
    index: function(n, o) { /* do something on index change */ }
  }
}
```

#### Custom events and emition

Abban az esetben, ha a gyerek komponens szeretne üzenni a szülőnek custom eventeket használhatunk. Ezeket a szülő ugyan úgy tudja elkapni mintha natív html eventek lennének azok. 

``` javascript
const task_item = {
  name: 'TaskItem',
  template: ...,
  props: [ 'task', 'index' ],
  methods: {
    remove() {
        let payload = { index: this.index }
        this.$emit('remove', payload);
    }
  }
}
```

Mivel adatot(payload) is szeretnénk az eseményhez csatolni, nem elég függvényhívást kötni az eseményhez, hanem a függvény referenciáját kell átadnunk. Ekkor a függvény első paramétere a payload lesz.

``` html
<div id="parent">
  <taskitem v-for="task in todo_list"
    v-bind:task="task"
    v-on:remove="removeTask"/>
  </taskitem>
</div>
```

``` javascript
const app = new Vue({
  el: '#parent',
  ...
  methods: {
    removeTask(payload) {
      console.log('removed: ' + payload.index);
    } 
  }
})
```

### Component registration

Most, hogy tudjuk mire képesek a komponensek beszéljünk arról, hogy használhatjuk őket.

Az előbb már láthattuk, hogy hogyan hivatkozhatunk rájuk:

``` html
<div class="app">
  ...
  <taskitem v-for="task in todo_list"
    v-bind:task="task"
    v-on:remove="removeTask"/>
  </taskitem>
  ...
</div>
```

Ahhoz viszont, hogy ezt így tudjuk használni előbb be kell regisztrálnunk a komponenseinket.

#### Global registration

``` javascript
Vue.component('taskitem', task_item);
```

#### Local registration

Local esetén csak annak a komponensnek vagy Vue példány számára regisztráljuk be, ami használni fogja azt.

``` javascript
const app = new Vue({
  el: '#app',
  components: { 'taskitem': task_item }
  ...
})
```

