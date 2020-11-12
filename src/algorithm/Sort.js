








/**
 * 归并排序算法是采用的 分治法（Divide and Conquer）
 * 自上而下 递归 （在JavaScript里面，递归层级太深了可能失效）
 * 自下而上 迭代
 * 时间复杂度 O(n*log(n)) 需要额外的空间
 * 
 * 
 * 
 * 算符步骤
 * 1、申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列
 * 2、设定两个指针，最初位置分别为两个已经排序序列的起始位置；
 * 3、比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置
 * 4、重复步骤 3 直到某一指针达到序列尾
 * 5、将另一序列剩下的所有元素直接复制到合并序列尾。
 * 
 * 详情图如下链接 https://pic4.zhimg.com/v2-10511156525479788c0714c183555a63_b.jpg
 */

let Arr = [6, 10, 1, 9, 4, 8, 2, 7, 3, 5];


function mergeSort(arr) {
  let len = arr.length;
  if (len < 2) {
    return arr;
  }

  let middle = Math.floor(len / 2 + 0),
      left = arr.slice(0, middle);
      right = arr.slice(middle, len);
  
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}

