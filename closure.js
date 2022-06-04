function logPerson() {
  console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
}

const person1 = {name: "Mihay", age: 22, job: 'Frontend'}
const person2 = {name: "Olena", age: 19, job: 'SMM'}

function bind(person, method) {
  person.log = method;
  return person.log();
}

bind(person1, logPerson);
bind(person2, logPerson);

// Продвинутый вариант - функции logPerson назначить объект контекст вызова
function bindPro(context, fn) {
  return function () {
    fn.call(context)
  }
}
bindPro(person1, logPerson)();
bindPro(person2, logPerson)();

// node closure