





/**
 * 前缀树 (Trie)
 * 
 * 专门处理字符串匹配的数据结构，用来解决在一组字符串集合中快速查找某个字符串的问题
 * Trie 树也称前缀树（因为某节点的后代存在共同的前缀，比如pan是panda的前缀）。
 * 它的key都为字符串，能做到高效查询和插入，时间复杂度为O(k)，
 * k为字符串长度，缺点是如果大量字符串没有共同前缀时很耗内存
 * 
 * 核心思想就是通过最大限度地减少无谓的字符串比较，使得查询高效率，
 * 即「用空间换时间」，再利用共同前缀来提高查询效率。
 */

class Node {
  constructor(str) {
    // 每个字符经过节点的次数
    this.path = 0;
    this.children = Object.create(null);
    this.endCount = 0;
  }
}

class TrieNode {
  constructor() {
    this.root = new Node('root');
  }

  insert(str) {
    let cur = this.root;
    for (const c of str) {
      if (!cur.children[c]) {
        cur.children[c] = new Node(c);
      }
      cur.path += 1;
      cur = cur.children[c];
    }
    cur.endCount++;
    cur.isWord = true;
  }

  traverse(str) {
    let cur = this.root;

    for (const c of str) {
      if (!cur.children[c]) return false;
      let node = cur.children[c];
      cur = node;
    }
    return cur;
  }

  search(str) {
    let node = this.traverse(str);
    if (node) {
      return node.isWord;
    }
    return false;
  }

  delete(str) {
    let node = this.traverse(str);
    let cur = this.root;
    if (!node) return;

    for (const c of str) {
      if (--cur.children[c].path == 0) {
        cur = cur.children[c];
        cur.children = Object.create(null);
        return
      }
      cur = cur.children[c];
    }
    cur.endCount--;
  }

  startsWith(str) {

  }
}

let tree = new TrieNode();
tree.insert('cook');
tree.insert('com');
tree.insert('coo');
tree.insert('cookies');

tree.delete('cookies');
tree.insert('cooki');

tree.delete('cooki');

console.log(JSON.stringify(tree, null, 2));



/**
 * 并查集
 */










