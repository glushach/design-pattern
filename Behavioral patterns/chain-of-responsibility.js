/*
  Цепочка обязаностей - патерин, который позволяет передавать запросы
  последовательно по цепочке обработчиков. Причем его сосбенность в том, что каждый
  последующий обработчкик решает задачу того, что помет он сам обработать запрос,
  либо его нужно передать дальше по цепочке. Другими словами, что если представить
  что у нас есть некая абстрактная цепочка и в нее поступают  данные, то изначально
  они поступаю на первый элемент. Этот элемент решает, может ли он обработать данные
  или нет. Если может, то нам возвращаеться обработанный результат. Если обработку
  осуществить нельзя, то эти данные передаюся на следующий элемент цепочки.
  И так далее, пока не попадеться нужный обработчик.

  Когда может пригодиться? Предположим, что вы разрабатываете некую систему онлаин
  покупок и каждый зарегестрированный пользователь может помет выбрать несколько карточек оплаты.
  или несколько систем оплаты. Для чего  это делаеться? Когда пользователь хочет что-то
  купить, то подключая несколько систем оплаты, ему нет необходимости контролировать
  свой баланс в каждой из этих систем. Эту достаточно нажаь кнопку покупки, а
  написанная вами цепочка обязанностей отправить запрос в первую систему оплаты
  и в случае успеха проведет операцию. Если же в системе оплаты денег будет недостаточно
  то она дернет следующую и так далее, пока транзакция не будет успешной.
  Либо пока не вернется сообщение о том, что проверены все счета, но средств не хватает.
*/

/* В класссе Account есть 3 ключевых метода.
   Метод canPay сравнивает поступающие значения транзакций на оплату, с текущим
   значением баланса.
   Метод setNext устанавливает приемника. Другими словами во внутрь одного объекта
   помещфеться другой.
   Метод pay на вход принимает транзакцию оплаты и прогоняет ее через условие.
   Если выбранная платежная система может оплатить счет, то все рпекрасно, сообщение об
   оплате выводиться в консоль. В случае, если это произойти не может - мы запускаем
   следующее условие. Мы проверяем, есть ли у данной системы приемник, то есть есть ли
   в цепочке следующая система оплаты. И если такакая есть, то выводиться сообщение
   о том, что с помощью текущей системы оплата не можзет быть произведена и
   ответсвенность переадресованная на следующую систему. Ну а мы ссответсвенно погружаемся
   на уровень ниже, где проводим все те же операции. Это так сказать своеобразная рекурсия.
   И в конечно итоге, если баланса по прежнему не хватает и вложенных систем также нет,
   то выводиться ссобщение о том, что не хватает денег.
*/

class Account {
  pay(orderPrice) {
    if (this.canPay(orderPrice)) {
      console.log(`Paid ${orderPrice} using ${this.name}`);
    } else if (this.incomer) {
      console.log(`Cannot pay using ${this.name}`);
      this.incomer.pay(orderPrice);
    } else {
      console.log('Unfortunately, not enough money')
    }
  }

  canPay(amount) {
    return this.balance >= amount;
  }

  setNext(account) {
    this.incomer = account;
  }

  show() {
    console.log(this)
  }
}


/*
  Создадим объекты платежных систем. Все они наследуються от класса Account,
  который содержит имплементацию цепочки ответственности
*/
class Master extends Account {
 constructor(balance) {
   super();
   this.name = "Master Card";
   this.balance = balance;
 }
}

class Paypal extends Account {
  constructor(balance) {
    super();
    this.name = 'Paypal';
    this.balance = balance;
  }
}

class Qiwi extends Account {
  constructor(balance) {
    super();
    this.name = 'Qiwi';
    this.balance = balance;
  }
}

/* Проверяем работу цепочки */

// Set System balance
const master = new Master(100);
const paypal = new Paypal(200);
const qiwi = new Qiwi(500);

// Define chain
master.setNext(paypal);
paypal.setNext(qiwi);

// Start payment
master.pay(438);
/*
  Cannot pay using Master Card
  Cannot pay using Paypal
  Paid 438 using Qiwi
*/

/*
  За базовую систему мы взяли Master Card и создали в ней приемника Paypal,
  а в нем приемник Qiwi.

  Затем создали платежный счет и в носоли выдим, что олатить счет, мы смогли только с
  помощью Qiwi. Остальные же системы выводять инфу о нехватке денег.

  Расмотрим цепочуц приемников наших систем. Для этого в класс Account добавим метод show

*/

master.show();
/*
  Master {
    name: 'Master Card',
    balance: 100,
    incomer: Paypal {
      name: 'Paypal',
      balance: 200,
      incomer: Qiwi { name: 'Qiwi', balance: 500 }
    }
  }
*/

/*
  В консоли вы можете выдет объект платежа платежной системы Master, в котором
  появилось поле incomer, в котором присвоен объект платежной системы Paypal,
  у которого также есть incomer с системой Qiwi. И хоть все эти платежные системы
  изначально находяться на одном уровне и ничего не подозревают друг о друге,
  с помощь цепочки обязаностей нам удалось установить их взаимосвязь и зону их
  ответсвенности. Таким образом сумируя все выше сказанное - данный патерн помогает
  создать абсолютно любые цепочки для обработки поступающих данных и в случае
  невозможности обработки этих данных на одном уровне, они могут быть переданны
  на следующий, пока не будут корректно обработаны. Самы же цепочки способны
  довольно гибко конфигурироваться


*/

//node chain-of-responsibility