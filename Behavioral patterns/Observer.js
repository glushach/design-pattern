/* Наблюдатель - поведенческий патерин проектирования, который создает механизм подписки,
 позволяющий одним объектам следить за изменениями других объектов. Те, кто из вас работает с РЕАКТ,
 понимают о чем я говорю. Определения этого шаблона полностью дает представление о том, что он делает.

 В каких ситуациях нужен этот шаблон? С ростом приложения может понадобиться хранить данные, от которых
 зависит несколько компонентов в одном объекте или классе. Этот класс играет роль стора, или хранителя.
 В свою очередь он содержит определенное свойство от изменения которых завист логика определенных
 компонентов. Он соответсвенно содержит список этих зависящих компонентов, которые в данном кейсе
 называються подпписчиками. Также у этого класса есть методы, с помощью которых можно изменять
 наблюдаемые свойства и методы, котрые оповещают о том, что свойства изменилось и на это не плохо было
 бы отреагировать. Теоритический пример - это людая подписка на новостные ленты ресурса, то есть
 ркгестрируясь на сайте, вы оставляете свой имеил, почсле чего вам на почту начитнают приходить
 новости с этого ресурса.

 Вот так выглядит класс за именениями которого следят и реагируют на них.

 Разберем пример. В конструкторе мы определяем свойство для новости и массив подписчиков. В нашем
 случае он назывпаеться actions, так как на изменение свойство new внутри подписчика должен срабатывать
 какойто метод, или action. Далее  setNews принимает строковое значение новости и изменяет своство news
 плюс вызывая метод notifyAll, то есть метод оповещения. Сам же notifyAll пробегаеться по массиву
 подписчиков и дергает в них метод inform, внутрь которого передаеться контекст this. Он нужен для того,
 чтобы внутри класса подписчика у него был доступ к свойсту news. Два последних метода это register
 и unregister, которые нужны для подписки и отписки наболюдателя. В нашем случае они просто добаляют
 новый элемент в массив, либо уберают его.

*/

class AutoNews {
  constructor() {
    this.news = '';
    this.actions = [];
  }

  setNews(text) {
    this.news = text;
    this.notifyAll();
  }

  notifyAll() {
    return this.actions.forEach(subs => subs.inform(this));
  }

  register(observer) {
    this.actions.push(observer);
  }

  unregister(observer) {
    this.actions = this.actions.filter(el => !(el instanceof observer));
  }
}

/* Создаем подписчиков. Это классы хоть и называються подписчиками, но они ни на что не подписаны.
  Чуть позже мы реализуем эту подписку. Пока, что это просто классы.
*/
class Jack {
  inform(message) {
    console.log(`Jack has been informed about ${message.news}`)
  }
}
class Max {
  inform(message) {
    console.log(`Max has been informed about ${message.news}`)
  }
}

/* Проверим работу нашей имплементации */
const autoNews = new AutoNews();

autoNews.register(new Jack());
autoNews.register(new Max());

autoNews.setNews('New Tesla price is 40 000');

/*
  Jack has been informed about New Tesla price is 40 000
  Max has been informed about New Tesla price is 40 000
*/

/*
  Создали инстанс новостной ленты. На тем на эту ленту с помощью метода register,
  мы подписываем два наших объекта наблюдателя. После чего мы выхываем метод setNews,
  где устанавливаю новость, в консоли видим резльтат того, что оба подписчика оповещены
  об этом изменении.

  ИТОГ: Наблюдатель - это механизм создания слежения одного объекта, за изменениями другого
  и реагирования на эти изменения.

*/

// node Observer.js