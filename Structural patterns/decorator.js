/* С помощь него мы можем добавлять объектам новые свойства и методы. То есть
оборачивать наш объект в этот самый класс декотратора и тем самым разширять
его возможности

Декоратор нужно использовать если нам понадобиться создать большое
количество подклассов. Например есть базовый класс Car и на его базе можно собрать другие

Представим, что у нас есть заготовка на основании кторой мв можем собрать БМВ, АУДИ,
ТЕСЛУ. Каждое собранное авто может иметь свою компленктацию.
Таким образом на основании нашего конструктора или эталлоного кузова
появляеться огромное кол-во дочерних классов или разноводностей авто.
Чтобы избежать огромного кол-ва таких классов нам поможет декоратор.

Декоратором может выступать класс, который принимает объект и добавляет ему дополнительные свойства
или методы, тем самым расширяет его. Декоратор может одно свойство добавить разным объетам

* */

class Car { // это базовый класс - эталлонная конструкция авто
  constructor() {
    this.price = 10000;
    this.model = 'Car';
  }

  getPrice() {
    return this.price;
  }

  getDescription() {
    return this.model;
  }
}

// На основании абстрактного класса Car создадим класс авто Tesla
class Tesla extends Car {
  constructor() {
    super();
    this.price = 25000;
    this.model = 'Tesla';
  }
}
/*
  В Tesla определяем более конкретно стоимоть авто и ее название
  Это наше авто в базовой комплектации. Но базовая комплектация нас не
  устраивает. Нам нуже автопилот и парктроник. Для этого создадим
  классы декораторы
*/

class Autopilot {
  constructor(car) {
    this.car = car;
  }

  getPrice() {
    return this.car.getPrice() + 5000;
  }

  getDescription() {
    return `${this.car.getDescription()} with autopilot`;
  }
}

class Parktronic {
  constructor(car) {
    this.car = car;
  }

  getPrice() {
    return this.car.getPrice() + 3000;
  }

  getDescription() {
    return `${this.car.getDescription()} with parktronic`;
  }
}

/* Каждый из декораторов принимаеть объект car, добавляет к нему новую опцию и
соответсвенно изменяет итоговую стоимость и описание
Теперь есть все необходимые данные и мы можем создавать, который на конструктивно устраивает
 */

// Version with Autopilot & Parktronic
let tesla = new Tesla();
tesla = new Autopilot(tesla);
tesla = new Parktronic(tesla)

console.log(tesla.getPrice(), tesla.getDescription());
// 33000 Tesla with autopilot with parktronic


// Version with Autopilot only
let volga = new Tesla();
volga = new Autopilot(volga);

console.log(volga.getPrice(), volga.getDescription());
// 30000 Tesla with autopilot

/*Также мы можем создать новое авто и добавить к нему опции*/
class Audi extends Car {
  constructor() {
    super();
    this.price = 20000;
    this.model = 'Audi';
  }
}

let audi = new Audi();
audi = new Autopilot(audi);

console.log(audi.getPrice(), audi.getDescription());
// 25000 Audi with autopilot

/* У нас гибкая структура, которая отлично подходит для добавления нового поведения
объектов, без необходимости инициализировать это поведение по умолчанию
при создании объекта. Также мы избегаем необходимости создавать огромное кол-во
подклассов, которые зависят от различных условий. Все это возможно благодаря патерну декоратор
суть которого заключаеться в том, чтобы обернуть уже существующий класс и разшить его
функциональность*/

// node decorator