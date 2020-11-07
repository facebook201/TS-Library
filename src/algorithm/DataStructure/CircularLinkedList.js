

class Node {
  constructor(element, next = null) {
    this.element = element;
    this.next = next;
  }
}

class CircularLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  append(element) {
    const node = new Node(element);
    let current = this.head;

    if (!this.head) {
      this.head = node;
      node.next = this.head;
    } else {
      // 最后一个元素等于
      while(current.next.element != this.head.element) {
        current = current.next;
      }
      current.next = node;
      node.next = this.head;
    }
    this.size++;
  }
  insert(p, element) {
    const node = new Node(element);
    if (p < 0 && p > this.size) return;

    if (p === 0) {
      this.head = node;
      this.size = 1;
      return;
    }

    let current = this.head;
    let previous = null;
    let index = 0;
    
    while (index < p) {
      previous = current;
      current = current.next;
      index++;
    }

    node.next = current;
    previous.next = node;
    this.size++;
  }
  // 删除指定元素
  remove(element) {
    let current = this.head;
    let previous = null;

    while (current.element !== element) {
      previous = current;
      current = current.next;
    }
    
    previous.next = current.next;
    this.size--;
  }
}

const cl = new CircularLinkedList();

cl.append('A');
cl.append('B');
cl.append('C');
cl.append('D');

cl.insert(3, 'F');
console.log(cl);
cl.remove('D');
