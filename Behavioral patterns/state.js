/* Состояние - это патерн, который позволяет менять объектам свое поведение в
 зависимости от состояния, что со стороны выглядит, как будто в работу включился другой класс.
 Возможно вы попытались провести некую аналогию с состоянием Реакт и Редакс, но это не совсем так.
 Такая аналогия больше подходит к шаблону наблюдатель, который мы размотрели в предыдущем видео.
 Состояние здесь другое. Здесь ключевой момент в том, что програма может находиться в одном
 из нескольких состояний и в зависимости от этого, программа може реагировать на одно и то же
 событие по разному. Переход между этими состояниями может быть как ручным, ьто есть управляем,
 так и автоматическим, когда в зависимости от того или иного условия включаються следующие состояния.
 Самы простой жизненный пример - это заказ и доставка товара, а если быть точным, то
 слежение за состоянием доставки. Это шаги - оплата в пути и доставлено. На каждом из этих
 шагов, заказом можно выполнить те или иные операции. На стадии оплаты мы можем отказаться от
 заказа. Но на стадии в пути такой возможности нету. Зато можно именить адресс доставки.
 Все это просто теоретический пример для показа возможностей и поведения патерна. Но как обычно,
 переходим от теоретической части к практической.

 Создадим базовый класс заказа. У нас есть текущий статус заказа и следующий шаг заказа. Все
 это определяеться в конструкторе. Также у нас есть метод next, который перемещвет нас
 непосредственно на следующий шаг. На основании этого базового класса создадим классы шаги
 доставки
*/
class OrderStatus {
  constructor(name, nextStatus) {
    this.name = name;
    this.nextStatus = nextStatus;
  }

  next() {
    return new this.nextStatus();
  }
}

/* Как и говорилось шагов три. Это оплата, нахождение заказов в пути и непосредственная
 доствка заказчику. Заметье, что в конструкторе каждого мы определяем его имя, то есть имя
 текущего шага и определяем какой шаг будет следующий.
*/
class WaitingForPayment extends OrderStatus {
  constructor() {
    super('waitingForPayment', Snipping);
  }
}

class Snipping extends OrderStatus {
  constructor() {
    super('shipping', Delivered);
  }
}

class Delivered extends OrderStatus {
  constructor() {
    super('delivered', Delivered);
  }
}

/* Определяем объект заказа. В данном объекте мы как раз определяем состояние. И в начале оно
 получет вполне логичный шаг - это шаг оплаты. Также внутри этого класса мы определяем метод,
 который будет изменять наше состояние. Ну и конечно же в зависимости от того или иного состояния,
 в этот объекте появляеться возможность выполнения допонительных действий
*/
class Order {
  constructor() {
    this.state = new WaitingForPayment();
  }

  nextState() {
    this.state = this.state.next();
  }

  cancelOrder() { // <-- New method for cancelling order
    this.state.name === 'waitingForPayment' ?
      console.log('Order is canceled!') :
      console.log('Order can not be canceled');
  }
}
/*
  Проверим реализацию. Мы создаем инстанс нашего заказа и проверяем шаг на котором он
  находиться. Затем мы вызываем метод nextState, который помогает передвинуться нам на следующий
  шаг и так далее. Ну и чтобы было понятно, что при одних и тех же входных данных объект
  может работать по разному, мы добавим функциональность отмены заказа, которая должна работать
  только на первом шаге, то есть на шаге оплаты. Это метод cancelOrder.
*/
const myOrder = new Order();
console.log(myOrder.state.name) // waitingForPayment

myOrder.nextState();
console.log(myOrder.state.name); // shipping

myOrder.nextState();
console.log(myOrder.state.name); // delivered

/*
  ИТОГ: Состояние - это шаблон, который помогает изменять поведение класса в зависимости
  от его состояния, тем самым создавая разные реакции на одни и те же данные внутри одного
  класса.
*/
// node state