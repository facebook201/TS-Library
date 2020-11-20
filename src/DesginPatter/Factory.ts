
interface Product {
  operation(): string
}

abstract class Creator {
  public abstract factotyMethods(): Product
  public someOperation(): string {
    const product = this.factotyMethods();
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}


class ConcreteCreator1 extends Creator {
  public factotyMethods(): Product {
    // return new ConcretePro();
  }
}