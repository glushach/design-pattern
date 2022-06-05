/*
  Задача фасада скрыть сложную логику за простым фасадом. То есть собрать различные сложные
  структуры, объединить их и выдать простой способ манипуляции.

  Когда нужен? Если в коде встречаються громоздкие реализации с запутанной логикой или
  много параметров и аргументов, которые влияют на итоговый результат, то все это можно
  смело заворачивать в класс фасада, где и производить необходимые действия, а для
  всех манипуляций можно создать лишь пару простых методов, которые запускают нужные
  алгоритмы.
*/
class Conveyor {
  setBody() { console.log('Body set!')}
  getEngine() {'Dismantle Engine!'}
  setEngine() {console.log('Engine set!')}
  setInterior() { console.log('Exterior added!')}
  getInterior() {console.log('Update interior!')}
  setExterior() { console.log('Added interior!')}
  setWheels() {console.log('Wheels!')}
  addElectronic() {console.log('Added electronic!')}
  paint() {console.log('Car painted!')}
}
/* Есть обстракный класс Conveyor, который содержит методы, необходымые
  для выполнения какого то действия и получения результата
  Фактически это похоже на нажатие кнопки формы, то есть при нажатии мы
  запускаем начальный разработчик, собрать все данные заполненных  полей,
  сформировать запрос, править его, получить ответ и обработать этот ответ,
  после чего результат выполнения вывести на экран.
  По отдельности эти методы полезны, но практически не нужны, так как в отрыве
  от всего стека они не выполняют полностью всю операцию. Но никто не мешает
  ввсести дополнительную абстракцию над методами, чтобы задействовать их все,
  а на выходе вернуть один общий метод

  ЭТА АБСТРАКЦИЯ, КАК РАЗ НАЗЫВАЕТЬСЯ ФАСАД
*/
class ConveyorFacade {
  constructor(car) {
    this.car = car;
  }

  assembleCar() {
    this.car.setBody();
    this.car.setEngine();
    this.car.setInterior();
    this.car.setExterior();
    this.car.setWheels();
    this.car.addElectronic();
    this.car.paint();
    return this;
  }

  changeEngine() {
    this.car.getEngine();
    this.car.setEngine();
    return this;
  }

  changeInterior() {
    this.car.getInterior();
    this.car.setInterior();
    return this;
  }
}

/*
  Все операции мы собрали в эдиный метод assembleCar. При вызове этого
  метода собираеться готовый автомобиль, а что крутится под капотом
  никого не интересует. Есть один метод манипуляции, реализация которого спраятана
  за фасадом
  */

const conveyor = new ConveyorFacade(new Conveyor());
let car = conveyor.assembleCar();

console.log(car);
/*
  Body set!
  Engine set!
  Exterior added!
  Added interior!
  Wheels!
  Added electronic!
  Car painted!
  ConveyorFacade { car: Conveyor {} }
*/

/*
  По аналогии можно конструировать любые возможности.
  Для пример представим, что во время сборки произошел брак. В машину установили
  бракованный двигатель и интретьер с дефектами. В таком случе бракованные часты мы
  должны демонтировть, а на их место установить новые. Для этого нам нужны
  дополнительные методы внутри фасада (changeEngine & changeInterior). Эти методы
  включают демонтаж старого и установка нового оборудования.
*/

car = conveyor.changeEngine().changeInterior();

console.log(car);
/*Body set!
  Engine set!
  Exterior added!
  Added interior!
  Wheels!
  Added electronic!
  Car painted!
  ConveyorFacade { car: Conveyor {} }
  Engine set!
  Update interior!
  Exterior added!
  ConveyorFacade { car: Conveyor {} }
*/

/*
  Хоть и операций мнгго, но мы оперируем тремя главными.
  Ключевая идея паретна - это скрыть под капотом различные некрасывае реализации
  и предоставить удобный интерфейс взаомодействия.
*/

// node facade