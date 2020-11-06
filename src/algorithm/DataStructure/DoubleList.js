

/**
 * 双向链表
 */
class Node {
  constructor(ele) {
    this.element = ele;
    this.next = null;
    this.prev = null;
  }
}

class DoubleLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
  
  append(element) {
    const node = new Node(element);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  insert(position, element) {
    if (position >= 0 && position <= this.length) {
      const node = new Node(element);
      let current = this.head;
      let previous = 0;
      let index = 0;

      if (position === 0) {
        if (!head) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = current;
          current.prev = node;
          this.head = node;
        }
      } else if (position === this.length){
        // 最后一个节点加
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;

        current.prev = node;
        node.prev = previous; 
      }
      this.length++;
    }
  }

  remove(position) {
    if (position > -1 && position < this.length) {
      let current = this.head;
      let previous = 0;
      let index = 0;
      
      if (position == 0) {
        this.head = current.next;
        if (this.length == 1) {
          this.tail = null
        } else {
          this.head.prev =  null;
        }
      } else if (position == this.length - 1) {
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = null
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }

        previous.next = current.next;
        current.next.prev = previous;
      }
      this.length--;
      return current;
    }
  }
}

const l = new DoubleLinkedList();

l.append('A');
l.append('B');
l.append('C');
l.append('D');

l.insert(2, 'F');

console.log(l);
l.remove(2);


