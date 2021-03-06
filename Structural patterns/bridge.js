/* Этот паретр разделяет один или несколько классов на несколько отдельных
 иерархий, которые называютья абстракции и реализация, что в свою очередь
 помогает их изменгять без зависимости друг от друга.


 Предположим, что у нас есть 2 авто БМВ и Ауди. Будет считать, что это 2 подкласса
 корневого класса Авто. Тепрь предположим, что мы хотим разширить эту структуру
 цветами, например - черный и серебристый. Ткм образом 2 наших подкласса
 превращаютьсчя в 4. Это будет черный и серебристый БМВ и черная и серебристая Ауди
 Каждый раз при введении новог типа авто или же его цвета, колтчество подклассов
 будет расти в геометрической прогресии. В действительности эта проблема возникает
 из-за того, что мы пытаемся разширить наш корневой класс авто сразу в двух разных
 направлениях. Это марки авто и их цвета. Патерн мост помогает решить эту проблему
 заменяя обычное наследование композиций. Для этого предлагаеться выделить одно
 из направлений в отдельную иерархию, после чего уже непосредственно ссылаться
 на объект этотй иерархии. Вместо хранения его состояния и поведения внктри
 корневого класса.
 Если еще немного упростить, то мы можем сделать модели авто отдельным классом
 с подклассаамы черный и серебристый, а класс цветом просто получит ссылку на
 класс моделей и в случае необходимости может делигировать емку работу.
 Такая связь собственно и называеться мостом между моделями и цветом. При
 добавлении новых цветов не птребуеться изменять модели, а при добавлении
 соответственно цвета.


  Для начала отказываеться от корневого класса в который будут входить все подклассы
  которых было много и разделить на абстракцию и реализацию.

  Абсткракция - это спеуциальная обвертка, которая сама не выполняет работу,
  а делигирует ее одному из объектов реализации.
  Реализация - это объект, в котром описана непосредственно сама реализация

  СОЗДАЕМ КОРНЕВЫЕ КЛАССЫ
  */
class Model {
  constructor(color) {
    this.color = color;
  }
}
class Color {
  constructor(type) {
    this.type = type;
  }
  get() {
    return this.type;
  }
}
/* Нужно на основании этих классов отнаследовать для наших моделей
  автомобилей и их цветов. Для начала начнем с цветов.

  Для этого реализуем 2 подкласса BlackColor и SilbrigColor,
  Он унаследовались от коневого класса Color, работают
  только с цветами, не имея ни малейшего понятия о модели авто.

*/
class BlackColor extends Color {
  constructor() {
    super('dark-black');
  }
}

class SilbrigColor extends Color {
  constructor() {
    super('Silbermetallic');
  }
}

/* Создадим 2 модели авто. Сами модели с цветами не работают. Единственное, что у них
  есть - это метод paint, т. е. покраска, в котором идет не прямое взаимодействие с цветом,
  а делигирование работы на класс Color, в котором как раз описан метод get

  Технически на данный момент патерн мост уже реализован. То есть у нас еть 2 класса, которые
  могут изменять не зависимо друг от друга. Причем каждый знает только о своих изменениях,
  но связь или мост между ними уже есть. И эта связь описана в методе paint.
  Мостом же в данной имплиментации являеться класс Color? который как раз содержит метод get,
  дергающий классы цветов. Однаком можно ввести еще одн дополнительный уровень абстракции,
  то есть один объект где будет описан вызов метода paint и брать этот абстрактный класс
  вместо того, чтобы указывать его модели напрямую. Но в данной реализации делать это не будем,
  потому что это избиточная абстракция


*/
class Audi extends Model {
  constructor(color) {
    super(color);
  }

  paint() {
    return `Auto: Audi, Color ${this.color.get()}`;
  }
}

class Bmw extends Model {
  constructor(color) {
    super(color);
  }

  paint() {
    return `Auto: Bmw, Color: ${this.color.get()}`;
  }
}

const blackBmw = new Bmw(new BlackColor());
console.log(blackBmw.paint()) // Auto: Bmw, Color: dark-black

/* Теперь можно создать любое авто используя цвет и модель. Мы избежали такой
  случай: const blackBmw = new Bmw(), то есть кейс использования очень специфического
  конструктора. Вместо этого мы вызываем создание определенной модели авто, внутрь которого
  пердаем конструктор создания цвета. Таким образом мы разделили два различных направления создания
  и фактически изолировали их друг от друга. Оставив единственную связь через мост.

  ИТОГ: Патерн мост для разделения не прикасающихся функциональностей в одном классе. Он позволяет
  поместить всю реализацию в классы абстракцию и реализацию.
  Абстракция - это интерфейс взаимодействияю, который делегирует управление в реализацию
*/

// node bridge