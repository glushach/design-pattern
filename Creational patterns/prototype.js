/*
  Прототип позволяет копировать объкты не в даваясь в подробности их реализации
  С одной стороны это немного похоже на фабрику, но в действительности в шаблоне
  проторипа есть базовая реализация класса.
  Используя упрощенный интерфкейс мы создаем клонны объектов, которые могут понадобиться,
  чтобы в случае необходимости изменить и заточить их под выполнение определенных задач
*/

class TeslaCar {
  constructor(model, price, interior, autopilot) {
    this.model = model;
    this.price = price;
    this.interior = interior;
    this.autopilot = autopilot;
  }

  produce() {
    return new TeslaCar(this.model, this.price, this.interior, this.autopilot);
  }
}

// Produce base auto
const prototypeCar = new TeslaCar('S', 80000, 'black', false);

// Clone of base auto
const car1 = prototypeCar.produce();
const car2 = prototypeCar.produce();
const car3 = prototypeCar.produce();

// Changes for particular (конкретный) auto
car1.interior = 'white';
car1.autopilot = true;

console.log(car1); // отличаеться от других клонов, потому что на стр 31-32 ее изменили
/*TeslaCar {
  model: 'S',
    price: 80000,
    interior: 'white',
    autopilot: true
}*/


console.log(car2);
/*
TeslaCar {
  model: 'S',
  price: 80000,
  interior: 'black',
  autopilot: false
}
*/


console.log(car3);
/*
TeslaCar {
  model: 'S',
  price: 80000,
  interior: 'black',
  autopilot: false
}
*/

/*
    мы определили модель, цену, цвет интерьера и наличие автопилота.
    Это базовая документация авто. После чего на основании этой документации
    мы создаем прототип авто - prototypeCar, эталонный автомобиль

    Теперь, на основании прототипа мы создаем новые авто, на основании прототипа,
    просто клинируя его - используя метод produce
    Действительно car1, car2, car3 - это полные копии prototypeCar

    Теперь не меняя прототип, мы можем изменять только клоны

    ТАК можно менять только объекты под требования, не меняя клон
*/

/*
Прототип - позволяет создать копию объекта везьде, где нам это требуеться
с минимальными затратами памяти, так как создаеться копия на основании
уже существующей структуры. В случае необходитмости можно модифицировать
каждый экземпляр точетно под определенные нужды не изменяя базоваой структуры
*/

// node prototype