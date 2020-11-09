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

list.append('A');
list.append('B');
list.append('C');
list.append('D');
list.append('E');
list.append('F');
list.append('G');
// 环链表
// list.append('O');
console.log(list)


// 翻转链表 Leetcode92

function reverse(list) {
  if (list === null) {
    return null;
  }
  if (list.next == null) {
    return list;
  }
  // 递归
  let last = reverse(list.next);
  list.next.next = last;
  list.next = null;
  return last;
}

// reverse(list.head);

function IterReverse(list) {
  if (list.next == null) {
    return list;
  }

  let prev = null;
  let current = list;

  while (current != null) {
    [current.next, prev, current] = [prev, current, current.next];
  }

  // 动画图 https://pic.leetcode-cn.com/1c8927d9ff605502793d81ab344dbc17e16d6db2d8dd789045f56af432079519.gif
}

IterReverse(list.head);

/**
 * 翻转链表 在 m、n 之间位置 
 * Leetcode 92
 */

function reverseBetween(head, m, n) {
  if (head.next === null) {
    return null;
  }

  let prev = null;
  let current = head;
  let next = head;

  for (let i = 1; i < m; i++) {
    prev = current;
    current = current.next;
  }

  let prev2 = current;

  for (let i = 0; i < n - m; i++) {
    // prev = 
  }
}








/**
 * 判断是否有环 Leetcode 141
 * 快慢指针 快指针走两步 慢指针走一步                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
 */
function hasCycle(head) {
  if (head === null) return false;
  let slow = head;
  let fast = head;

  while (fast.next != null && fast.next.next != null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }
  return false;
}

// hasCycle(list.head);

function detectCycle(head) {
  if (head === null) {
    return null;
  }

  let slow = head;
  let fast = head;
  let hasCycle = false;

  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      hasCycle = true;
      break;
    }
  }

  if (!hasCycle) {
    return null;
  }

  fast = head;
  while (fast !== slow) {
    slow = slow.next;
    fast = fast.next;
  }
  return fast;
}

// detectCycle(list.head);

