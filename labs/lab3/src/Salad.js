import { v4 as uuidv4 } from 'uuid';

export default class Salad {
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

  getPrice() {
    return Object.keys(this).reduce(
      (acc, ingredient) => acc + this[ingredient].price, 0);
  }

  count(prop) {
    return Object.values(this).filter(item => item[prop]).length;
  }
}