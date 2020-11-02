
/**
 * 数组操作 Array
 */

/**
 * 1、旋转数组
 * 给定一个数组 将数组中的元素向右移动 K 位，K是非负数
 * 输入: [1,2,3,4,5,6,7] 1 和 k = 3
 * 输出: [5,6,7,1,2,3,4]
 * 解释:
 * 向右旋转 1 步: [7,1,2,3,4,5,6] 向右旋转 2 步: [6,7,1,2,3,4,5] 向右旋转 3 步: [5,6,7,1,2,3,4]
 **/


/**
 * 解题思路
 * 元素向右移动 相当于截取最后一个元素 然后插入到第一项，
 * 执行这个操作 K 次，然后如果K大于数组长度 就是 K % Length
 */

const array = [1, 2, 3, 4, 5, 6, 7];

/**
 * @param {number[]} nums 数组
 * @param {number} k 移动位置
 */
function rotate(nums, k, way = 1) {
  const l = nums.length;
  // 得到移动的位置
  k = k % l;

  if (way == 1) {
    while (k > 0) {
      let lastElement = nums.pop();
      nums.unshift(lastElement);
      k--;
    }
  } else if (way == 2){
    // 方法二 直接一次性截取
    nums.unshift(...nums.splice(l - k, k));
  }
  return nums
}

// console.log(rotate(array, 3, 2));

/**
 * 移动零
 */

const array2 = [1, 0, 3, 0, 6, 21, 0, 98];

function moveZero(nums) {
  // 双指针引用 j 记录0的个数
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[j] = nums[i];
      j++;
    }
  }
  nums.fill(0, j, nums.length);
  console.log(nums)
}

moveZero(array2);

