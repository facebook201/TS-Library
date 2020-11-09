

// 删除链表倒数第n个节点
// 双指针引用 快指针先走n步，然后慢指针开始走，当快指针都到尾部，那么慢指针就是要删除的节点
function removeNthFromEnd(head, n) {
  if (head === null || head.next === null) {
    return null;
  }
  let fast = head;
  let slow = head;

  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return head;
}

removeNthFromEnd(list.head, 2);


/**
 * 合并两个有序链表 双指针偏移
 * 1. 创建一个新链表
 * 2. 当两个链表不都为空时执行以下循环
 * 3. 判断两个链表的第一个节点，取较小值放入新链表，原链表去掉该节点
 * 4. 直到两个链表都为空时循环结束，返回新链表
 */

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










