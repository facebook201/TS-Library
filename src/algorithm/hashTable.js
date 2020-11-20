/**
 * 哈希表 散列表
 * 
 * 哈希函数 用来将key转换成一串数字 这个数字对应实际的key、key来查value，
 * Hash函数要求相同的输入有相同的输出。每对数据都打上唯一的指纹标签。
 */


/**
 * 每个关键字被映射到0到数组大小N-1范围，并且放到合适的位置，这个映射规则就叫散列函数
 *
 * 理想情况下，两个不同的关键字映射到不同的单元，然而由于数组单元有限，关键字范围可能远超数组单元，
 * 因此就会出现两个关键字散列到同一个值得时候，这就是散列冲突
 * 
 * 冲突解决
 * 1、散列函数的选择非常重要
 * 2、尽量避免冲突 如果有
 *   2-1、拉链法
 *   2-2、开放地址法
 *   2-3、再散列
 * 
 **/


/**
 * 更好的散列函数
 * 
 */

function betterHash() {

}

// stepSize = constant - key % constant;


function HashTable() {
  let storage = [];
  const storageLimt = 4;

  this.add = function (key, value) {
    let index = hash(key, storageLimt);

    if (!storage[index]) {
      storage[index] = {

      };
    }
  }
}
















