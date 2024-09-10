'use strict';
/**
 * Reflection question 1: Why don’t we need to store properties with the value false in the JavaScript objects?
 * Since non-declared variables are automatically declared as undefined, this will equal to false.
 * Therefore they don't need to be explicitly set as false.
 */

import inventory from './inventory.mjs';
import { v4 as uuidv4 } from 'uuid';
console.log('\n=== beginning of printout ================================')
console.log('inventory:', inventory);

console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n--- for ... in ---------------------------------------')
for (const name in inventory) {
  console.log(name);
}

/**
 * Reflection question 2: When will the two examples above give different outputs, and why is inherited functions, such as forEach(), not printed?
 * An enumerable property in JavaScript means that a property can be viewed if it
 * is iterated using the for…in loop or Object.keys() method.
 * When a property is owned it is also enumerable, but the inherited function forEach
 * is not enumerable, and won't be printed in a loop that iterates over enumerable properties.
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
  const options = Object.keys(inv).filter(item => inv[item][prop])
    .map(item =>
      `<option value="${item}" key=${item}> ${item}, ${inv[item].price} kr</option>`
    );
  return options;
}

console.log(makeOptions(inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {
  static instanceCounter = 0;

  constructor(salad) {
    if (salad !== undefined) {
      Object.keys(salad).forEach(ingredient => this[ingredient] = salad[ingredient])
    }

    Object.defineProperty(this, 'id', { value: Salad.instanceCounter++, writable: false });
    Object.defineProperty(this, 'uuid', { value: uuidv4(), writable: false });
  }

  add(name, properties) {
    this[name] = properties;
    return this;
  }

  remove(name) {
    delete this[name];
    return this;
  }

  static parse(salad) {
    // if (salad === typeof "string") {
    const parsed = JSON.parse(salad);
    return Array.isArray(parsed) ? parsed.map(salad => new Salad(salad)) : new Salad(parsed);
    // }
  }
}

Salad.prototype.getPrice = function () {
  return Object.keys(this).reduce(
    (acc, ingredient) => acc + this[ingredient].price, 0);
}

Salad.prototype.count = function (prop) {
  return Object.values(this).filter(item => item[prop]).length;
}

let myCaesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')
console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör

console.log('\n--- reflection question 3 ---------------------------------------')
/**
 * Reflection question 3: How are classes and inherited properties represented in JavaScript?
 * What is the difference between an object’s prototype chain and having a prototype property?
 * 
 * Classes in JavaScript have a constructor function and its methods are stored
 * on the class' prototype object. The instances of the class inherit its properties and
 * the methods from the prototype. Inherited properties are represented by the prototype chain.
 * 
 * Only functions have a prototype property (ex Salad) and instances are linked to their
 * constructor's prototype. The prototype chain is the inheritance and determines which
 * properties and methods an object has. The prototype property is the starting value of
 * the prototype chain. Next object in prototype chain: Object.getPrototypeOf()
 */
console.log('typeof Salad: ' + typeof Salad); // constructor function
console.log('typeof Salad.prototype: ' + typeof Salad.prototype); // object
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype); // doesn't exist
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad); // instance of Salad -> object
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype); // instances don't have a prototype property
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad))); //false: Salad's prototype is linked to Object.prototype
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad))); //true
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype))); //true

console.log('\n--- Assignment 4 ---------------------------------------')

const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy));
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy));
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')

class GourmetSalad extends Salad {
  add(name, properties, size = 1) {
    if (this[name]) {
      this[name].size += size;
    } else {
      super.add(name, { ...properties, size })
    }

    return this;
  }
}

GourmetSalad.prototype.getPrice = function () {
  return Object.keys(this).reduce(
    (acc, ingredient) => acc + this[ingredient].price * this[ingredient].size,
    0
  );
};

let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------')

console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);

console.log("\n--- Assignment 7 ---------------------------------------");

const salad1 = new Salad();
console.log("Sallad 1 har uuid: " + salad1.uuid);
// add ingredients to salad 1
const salad2 = new Salad(salad1);
console.log("Sallad 2 är kopia av Sallad 1 och har uuid: " + salad2.uuid);
// salad1.uuid !== salad2.uuid, they are different salads salad2.add(Bacon', inventory['Bacon']);
//order(salad1, salad2);

// const salad1 = new Salad(); // add ingredients to salad 1
//         storeInDatabase(salad1);
//         // app is reloaded, all JavaScript objects are lost
//         const text = fetchFromDatabase();
// const salad2 = Salad.parse(text);
// salad1.uuid === salad2.uuid, they are the same salad salad2.add(Bacon', inventory['Bacon']); storeSaladInDatabase(salad2); // update the existing salad

/**
 * Reflection question 4: In which object are static properties stored?
 * They are stored on the constructor function (not on instances or the prototype).
 */
/**
 * Reflection question 5: Can you make the id property read only?
 * Yes, we can use Object.defineProperty() and set the writable attribute to false.
 */
/**
 * Reflection question 6: Can properties be private?
 * Yes, by using # they're only accessible through dot notation within the class.
 */
