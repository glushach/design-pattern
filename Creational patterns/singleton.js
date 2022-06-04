const instance1 = {
  name: 'singleton'
}
const instance2 = {
  name: 'singleton'
}
console.log(instance1 === instance2); //false

const ob1 = {};
const obj2 = {};
console.log(ob1 === obj2) //false

//
/*
  Для того, чтобы создать объект в едином экземпляре есть 2 подхода

  Подход 1. Создать глобальную переменную и обращаться к ней, после чего весь код завернуть в модуль
  Подход 2. Определить объект внутри объекта
*/

// Подход 1
let instance; // использование глобальных переменных не желательно
class Counter {
  constructor() {
    if (!instance) instance = this;
    instance.count = 0;
    return instance;
  }
  // Теперь class будет всегда возвращать ранее созданный объект
  getCount() {
    return instance.count;
  }
  increaseCount() {
    return instance.count++;
  }
}

const myCount1 = new Counter();
const myCount2 = new Counter();

myCount1.increaseCount();
myCount1.increaseCount();
myCount2.increaseCount();
myCount2.increaseCount();

console.log(myCount2.getCount()); //4
console.log(myCount1.getCount())  //4


// Подход 2
class CounterNormal {
  constructor() {
    if (typeof CounterNormal.instance === 'object') {
      return CounterNormal.instance;
    }
    this.count = 0;
    CounterNormal.instance = this;
    return this;
  }
  // Теперь class будет всегда возвращать ранее созданный объект
  getCount() {
    return this.count;
  }
  increaseCount() {
    return this.count++;
  }
}

const CounterNormal1 = new CounterNormal();
const CounterNormal2 = new CounterNormal();

CounterNormal1.increaseCount();
CounterNormal1.increaseCount();
CounterNormal2.increaseCount();
CounterNormal2.increaseCount();

console.log(CounterNormal2.getCount()); //4
console.log(CounterNormal1.getCount())  //4

// Singleton гарантирует, что у class есть только один экземпляр

// node singleton.js