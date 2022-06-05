/* Оборачивает несовместимый с чем-то объект и делает его совместимым,
  не изменяя исходный код объекта. Из ральной жизни пример - это кард ридер
  Есть много флешек cd, micro, cd type с и всего лишь один порт USB.
  Чтобы перебрасывать инфу с этих флеш карт на ПК, используеться кард ридер.
  Утилита - получение двух разных ответов от сервера и приведение их к единому виду,
  нормализация своего рода. То же самое моэжно сдедать и для классов. С помощью
  дополнительной обветки сделать сделать им одинаковые интерфейсы взаимодействия

  Расмотрим реализацию этого патерна на примере тюнинга авто.
*/
class Engine2 {
  simpleInterface() {
    console.log('Engine 2.0 - tr-tr-tr');
  }
}

class EngineV8 {
  complecatedInterface() {
    console.log('Engine V8! - wrong wroom!')
  }
}
/* Нужно подогнать подключение EngineV8 на место Engine2.
  В этом случае понадобиться патерн Адаптер.
  Для этого создадим дополнительный класс, который будет оборачивать нестандартный класс
  и подгонять его под стандартные уже использующиеся методы
*/
class EngineV8Adapter {
  constructor(engine) {
    this.engine = engine;
  }

  simpleInterface() {
    this.engine.complecatedInterface();
  }
}

/* Мы обернули метод complecatedInterface в метод simpleInterface
* и технически у нас появился адаптер, новый двигатель должен
* удачно стать на метсто прежнего. Для проверки создадим класс авто
* */
class Auto {
  startEngine(engine) {
    engine.simpleInterface();
    return this;
  }
}

// Запускаем комбинацию классов
// Engine 2.0
const myCar = new Auto();
const oldEngine = new Engine2();

console.log(myCar.startEngine(oldEngine)) // Engine 2.0 - tr-tr-tr Auto {}

// Engine V8 with adapter
const engineAdapter = new EngineV8Adapter(new EngineV8());

console.log(myCar.startEngine(engineAdapter)) // Engine V8! - wrong wroom! Auto {}

{
  const engineAdapter = new EngineV8Adapter();
  console.log(myCar.startEngine(engineAdapter)) // ERROR
}

/*Итог: Адаптер структрный патер, что оборачивает объект с уникальным или специфическим
* внутренным устройством и подгоняет его под использование в уже стандартизированной
* системе классов, то есть адаптирует его специфические свойства и методы под уже используеме
* что позволяет объектам с не совместимыми интерфейсами работать вместе */

// node adapter