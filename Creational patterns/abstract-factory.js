console.group('First instance');
console.log('Name is Alex');
console.log('Age is 25');
console.groupEnd();

/*
  создает интерфейс групирующие другие фабрики, которые логически связаны друг с другом.
  Условно говоря это своеобразаня абстракция для фабрики и фабричного метода

  Абстракная фабрика дополнительная надстройка над другими фабриками.

  Нужно помнить, что у подфабрик должен быть одинаковый интерфейс создания объектов
  чтобы им можно было управлять из абстрактной фабрики

*/

/*
  Производство автомобилей - это прежде всего фабрика, где может производиться одна определенная модель
  Для каждого модельного ряда запусскаеться своя фабрика,
  которая делает инстансы машин объектов
*/

// Abstract factory
function bmwProducer(kind) {
  return kind === 'sport' ? sportCarFactory : familyCarFactory;
}

// Factories
function sportCarFactory() {
  return new Z4();
}

function familyCarFactory() {
  return new I3();
}

class Z4 {
  info() {
    return 'Z4 is a Sport car!'
  }
}
class I3 {
  info() {
    return 'I3 is a Family car!'
  }
}

console.log(bmwProducer('family')().info()) //I3 is a Family car!
console.log(bmwProducer('sport')().info())  //Z4 is a Sport car!

/*
Абстракная фабрика, дополнительная настройка (абстракция),
которая управляя однотипными фабриками создает объекты со схожей структурой
но с разными данными, при этом не привязывакеясь к конретным классам
*/

//node abstract-factory