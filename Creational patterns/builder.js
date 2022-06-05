/* Используеться для создания объктов со сложными состояниями.
  Также он может иметь дополнительный слой абстракции - это директор,
  который управляет несколькими строителями, но чтобы не усложнять реализацию
  в этом коде директора не будет.

  Создание объеквта с определенными значениями инициализируеться в конструкторе.
  С контрукторе задаються различные свойства будущего объекта. Но если данный процесс
  усложняеться и свойства начинают завсист от различных факторов и добавляться они
  также могут в зависимости от различных условий, то конструктоир класса может разростись
  до невероятных размеров. ЧТОБВ ТАКОГО НЕ ПРОИЗОШЛО ИСПОЛЬЗУЕТЬСЯ ПАТЕРН БИЛДЕР, который
  позволяет создавать сложные объекты, инициализацию которых проблематично уместить
  в конструкторе.
*/
class Car {
  constructor() {
    this.autoPilot = false;
    this.parktronic = false;
    this.singnaling = false;
  }
}

// С целью модификации Car нам нужно создать билдер CarBuilder
class CarBuilder {
  constructor() {
    this.car = new Car(); // создание экземпляра класса авто
  }

  addAutoPilot(autoPilot) {
    this.car.autoPilot = autoPilot;
    return this;
  }

  addParktronic(parktronic) {
    this.car.parktronic = parktronic;
    return this;
  }

  addSignaling(parktronic) {
    this.car.parktronic = parktronic;
    return this;
  }

  updateEngine(engine) {
    this.car.engine = engine;
    return this;
  }

  build() {
    return this.car;
  }
}

const myCar = new CarBuilder()
  .addAutoPilot(true)
  .addParktronic(true)
  .updateEngine('V8')
  .build();

console.log(myCar);
/*Car {
  autoPilot: true,
    parktronic: true,
    singnaling: false,
    engine: 'V8'
}*/

/*
  Воспользовавшись методами билдера мы изменяем базовые свойства объекта
  Каждый из методов идет по цепочке - в этом и есть одна из особенностей
  билдера, полное конфигурирование нужного объекта максимально простым интерфейсом

  */

// можем создать еще одно авто и сконфигурировать его по другому
const myNewCar = new CarBuilder()
  .addSignaling(true)
  .updateEngine('V4')
  .build();

console.log(myNewCar);
/*Car {
  autoPilot: false,
  parktronic: true,
  singnaling: false,
  engine: 'V4'
}
*/

/*
  Вывод: данный патерн в очень удобной форме позволяет создавать
  различные конфигурации объектов не засоряя исходный конструктор
  дополнительной логикой, которая в нем фактически не нужно.
  Также данный шаблон проектирования нужен если объект существует
  в разных вариациях или процесс инстанцирования состоит из нескольких
  шагов.
*/
// node builder