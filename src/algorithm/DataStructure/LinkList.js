/**
 * 链表的类 Node表示节点 LinkedList 提供节点操作
 */

class Node {
  constructor(el) {
    this.el = el;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node('head');
    this.size = 0;
  }
  // 查找节点
  find(element) {
    let currentNode = this.head;

    while (currentNode.el !== element) {
      currentNode = currentNode.next;
    }
    let node = currentNode;
    return node;
  }
  // 插入
  insert(element, item) {
    let node = new Node(item);
    let currentNode = this.head;

    while (currentNode.el != element) {
      currentNode = currentNode.next;
    }
    // 保存D
    let nextNode = currentNode.next;
    currentNode.next = node;
    node.next = nextNode;
    this.size++;
  }
  // 删除特定元素
  remove(element) {
    let currentNode = this.head;
    let previous;

    if (currentNode.next == null) return false;

    while (currentNode.el !== element) {
      // 保存上一个节点 后面找到元素之后把他的next指针指向下一个即可
      previous = currentNode;
      currentNode = currentNode.next;
    }
    let nextNode = currentNode.next;
    previous.next = nextNode;
    this.size--;
  }
  // 尾部添加
  append(element) {
    let node = new Node(element);
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
    this.size++;
  }
}

const list = new LinkedList();

list.append('A');
list.append('B');
list.append('C');
list.append('D');
console.log(list);
list.insert('C', 'F');
list.remove('F');











