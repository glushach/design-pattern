/*
  Итератор - патерн, который дает возможность последовательно обходить
  элементы составных частей объектов не раскрывая их внутренее представление.
  Вызуально это похоже, как плеир перебирает песни, когда мы нажимает кнопки
  перемотки вперед и назад. В ES6 есть специализированный межанизм, который релизует
  эту логику и называеться он точно также.

  Необходимость создания петерна. Все дело в том, что если говорить объективно,
  то самая распростаненная структура данных - это колекция.
  Коллекция - это совокупность объектов, объединенных по каким то критериям.
  И технически структуры этих колекций могуть быть абсолютно разные. Они могуть быть
  простыми или линейными, либо они могуть быть сложными и выглядеть как деревья.
  Однако, какая бы структура колекции не была, рано или поздно может появится задача обойти
  эту колекцию. Причем, как сама колекция, так и механизмы ее обхода могуть меняться.
  И тем не мение всегда должна быть возможность перебрать эту коллекцию по элементно.
  Таким образом, ключевая идея патерна заключаеться в том, чтобы вынести поведение
  обхода колекции из самой колекции в отдельныйц класс. Сам же класс содержит два
  ключевых метода. Это next - это перемещение на следующий элемент коллекции и
  hasNext - это метод проверки существования следующего элемента. И в случае, если
  метод hasNext возвращает фолс, то перебор останавливаеться
*/

/*
  class Iterator самая простая реализация. В конструкторе на вход принимает массив
  элементов. В нем также есть 2 метода next, который обращаеться к колекции
  к энному элементу и метод hasNext, который ссобственно проверяет наличие
  энного элемента в коллекции.
*/
class Iterator {
  constructor(el) {
    this.index = 0;
    this.elements = el;
  }

  next() {
    return this.elements[this.index++];
  }

  hasNext() {
    return this.index < this.elements.length;
  }
}

/* Создаеться коллекция и выполняеться ее перебор. */
const collection = new Iterator(['Audi', 'BMW', 'Tesla', 'Mersedes']);

while (collection.hasNext()) {
  console.log(collection.next());
}
/*
  Audi
  BMW
  Tesla
  Mersedes
*/

/* Но если предположить, что у нас будет массив объектов, например, а метод
    перебора будет чуть сложнее, то все становться на свои места.
    Если на вход у нас поступает объект, то мы изначально формируем массив его
    ключей с помощью Object.keys(el), а затем пробегаемся по нему, точно также
    как и в первом примере.
*/

{
  class IteratorObject {
    constructor(el) {
      this.index = 0;
      this.keys = Object.keys(el);
      this.elements = el;
    }

    next() {
      return this.elements[this.keys[this.index++]];
    }

    hasNext() {
      return this.index < this.elements.length;
    }
  }

/* Аналог for of. Должны сами понимать, что мы сами задаем логику, как
   должны перебираться колекции. Причем таких логик может быть несколько.
   И взависимоти от входных условий, может использоваться самое оптимальное.
   Теперь сразу понятен основной плюс итератора. Это умный перебор коллекции,
   без разкрытия внутренего представления элементов. Таким образом мы не позволяем
   изменять, что-то внутри наших объектов. Другими словами, мы предоставляем
   инструмент доступа к объектам без возможности как-то повлиять на на эти объекты
*/
  const autos = {
    audi: {model: 'Audi', color: 'black', price: '20000'},
    bmw: {model: 'BMW', color: 'white', price: '30000'},
    tesla: {model: 'Tesla', color: 'gray', price: '40000'},
  }

  const collection = new IteratorObject(autos);

  while (collection.hasNext()) {
    console.log(collection.next());
  }
}

/*Audi
  BMW
  Tesla
  Mersedes
*/

// node iterator