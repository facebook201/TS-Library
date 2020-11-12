/**
 * 快速学习一个非常重要的策略就是，对繁杂的知识，进行统一划归，并进一步简化，去伪存真。
 * 任何一种知识，只要你能抓最主要的矛盾，掌握最核心的概念，你就能快速学习。
 * 这也是在硅谷大热的“第一性原理”
 * 
 * 二叉树
 *   二叉查找树
 *   平衡二叉树
 *   AVL树
 *   红黑树
 *   完全二叉树   
 * 
 * 
 * 多路查找树
 *   B树
 *   B+树
 *   2-3树
 *   2-3-4树
 * 
 * 
 * 堆
 *   小顶堆
 *   大顶堆
 *   二项堆
 *   优先队列
 */


class Node {
  constructor(value = null) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  // 添加树节点
  append(val) {
    // this.root = this.addChild(this.root, val);
  }

  // 迭代写法
  insert(val) {
    const node = new Node(val);
    if (this.root === null) { 
      this.root = node;
    } else {
      let currentNode = this.root;
      let parent = null;

      // 迭代的写法
      while (true) {
        parent = currentNode;
        if (val < parent.value) {
          currentNode = currentNode.left
          if (currentNode === null) {
            parent.left = node;
            break;
          }
        } else {
          currentNode = currentNode.right;
          if (currentNode === null) {
            parent.right = node;
            break;
          }
        }
      }
    }
    this.size++;
  }

  // 递归的写法
  addChild(root, val) {
    // 节点为空
    if (root === null) {
      this.size++;
      return new Node(val);
    }
    if (root.value > val) {
      root.left = this.addChild(root.left, val);
    } else if (root.value < val) {
      root.right = this.addChild(root.right, val);
    }
    return root;
  }

  // 查找
  find(val) {

  }

  // 遍历二叉树
  // 前序遍历 (其实就是DFS) 先访问根节点、遍历左子树、最后右子树



  // 中序遍历 (中序遍历是先遍历左子树，然后访问根节点，然后遍历右子树。)
  inOrder(node) {
    let stack = [];

    // 中序遍历递归写法
    function pushNode(node) {
      if (node !== null) {
        if (node.left !== null) {
          pushNode(node.left)
        }
        stack.push(node.value);
        if (node.right !== null) {
          pushNode(node.right);
        }
      }
    }

    // 中序遍历迭代 使用栈
    function pushNodeStack(node) {
      let middleStack = [];
      let current = node;
      let parent = null;

      while (current !== null || middleStack.length > 0) {
        if (current != null) {
          middleStack.push(current);
          current = current.left;
        } else {
          current = middleStack.pop();
          stack.push(current.value);
          current = current.right;
        }
      }      
      console.log(stack);
    }
    pushNodeStack(node);
    // console.log(stack);
    return stack;
  }
}
const t1 = new BST();

t1.insert(9);
t1.insert(7);
t1.insert(8);
t1.insert(5);
t1.insert(87);
t1.insert(23);
t1.insert(12);
t1.insert(19);

console.log(t1);

t1.inOrder(t1.root);
