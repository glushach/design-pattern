/* Снимок - это патерн, который позволяет сохранять и востанавливать
 предыдущее состояние объекта.

 Из примера, что первое приходить на ум - это любой редактор - тестовый, фото, кода
 не важно. Функции востановления или просто, то с поддержкой комбинации клавиш
 Ctrl + Z. Другими словами, данный шаблон помогает сохранять предыдущее состояние
 объекта, даже после того, как он изменился и востанавливать это состояние в случае
 необходиомсти. Данная операция бывает довольно поплезной.

 Создаеться объект хранителя. Обычный класс Memento.
 Затем ввсели объект creator, который содержит логику на создание и востановление
 снимков. В метод save передаеться текущее состояние, которое хотим сохранить.
 И в этом случае мы вызываем уже созданный конструктор Memento, который создает
 экземпляр объекта.
 В метод restore мы передаем структуру данных, которые хранит все наши сохраненные
 состояние и обращаемся к какому-либо элементу этой структуры.
 То есть восстанавливаем предыдущее сохраненное значение.
*/
class Memento {
  constructor(value) {
    this.value = value;
  }
}

const creator = {
  save: val => new Memento(val),
  restore: memento => memento.value
}

/*Но теперь мы можем описать
 класс, который будет хранить все предыдущее состояние, а также содержать методы,
 по сохранению и востановлению снимка.
 В констукторе мы определяем структуру в которой мы будем хранить наши снимки.
 Как вы видите, мы выбрали массив. В методе addMemento мы делаем снимок текущих
 данных и сохраняем его. В нашем случае мы просто пушим текущее значение в массив
 и соответственно методе в getMemento мы передаваем определенный индекс. Мы
 обращаемся к тому или инному элементу массива и возращаем его таким образом
 восстанавливаем предыдущее сохраненное значение. Как я и говорил, вся реализация
 довольно простая, как в написании, так и в реализации.

 Теперь нам нужно проверить написанную логику
*/
class Caretaker {
  constructor() {
    this.values = [];
  }

  addMemento(memento) {
    this.values.push(memento);
  }

  getMemento(index) {
    return this.values[index];
  }
}


/* В экземпляр хранителя с помощью метода addMemento мы создаем и сохраняем три
 состояния. Напомню, что метод save создает и сохраняет экземпляр класса Memento,
 после чего мы это значение сохраняем в массив класса careTaker. Замет в консоль
 мы выводим первый сохраненный элемен в массиве.
 Напомню, что в массиве индексы присваюваются с нуля, поетому мы получаем второй
 элемент массива в консоль Hello world.

 Таким образмо реализовали патерн хранитель, который сохраняет предыдущее
 состояние объектов и в случае необходимости может из востановить

*/
const careTaker = new Caretaker();

careTaker.addMemento(creator.save('hello'));
careTaker.addMemento(creator.save('Hello world'));
careTaker.addMemento(creator.save('hello world !!!'));

console.log(creator.restore(careTaker.getMemento(1))); // Hello world

// node memento