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
    let specialNodeOfF = null; 
    while (current.next) {
      if (current.el == 'C') {
        specialNodeOfF = current;
      }
      current = current.next;
    }
    current.next = node;
    if (element === 'O') {
      current.next.next = specialNodeOfF;
    }
    this.size++;
  }
}

const list = new LinkedList();
const list1 = new LinkedList();

list.append('A');
list.append('B');
list.append('C');
list.append('D');


list1.append('A');
list1.append('C');
list1.append('D');
list1.append('F');
list1.append('G');
list1.append('H');


function mergeTwoLists(head1, head2) {
  let newNode = new LinkedList().head;
  let prevNode = newNode;

  head1 = head1.next;
  head2 = head2.next;

  while (head1 !== null && head2 !== null) {
    if (head1.el <= head2.el) {
      prevNode.next = head1;
      head1 = head1.next;
    } else {
      prevNode.next = head2;
      head2 = head2.next;
    }
    prevNode = prevNode.next;
  }

  prevNode.next = head1 || head2;
  return newNode.next;
}

mergeTwoLists(list.head, list1.head);



