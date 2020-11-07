
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
  // 双指针引用 j记录0的个数 最后j的索引到到最末尾差值就是 0 的个数 然后补0即可
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[j] = nums[i];
      j++;
    }
  }
  nums.fill(0, j, nums.length);
  // console.log(nums)
}

moveZero(array2);


/**
 * 存在重复的元素
 * 给定一个整数数组，判断是否存在重复元素。如果任何值在数组中出现至少两次，
 * 函数返回 true。如果数组中每个元素都不相同，则返回false。
 * [1, 2, 3, 1] true [1, 2, 3, 4] false
 */


/**
 * @param {number []} nums
 * 方法一 排序之后遍历 相邻元素相等就表示重复
 * 二 set之后 重复元素会去掉 比较长度
 */
function duplicateElement(nums, way = 1) {
  let newNums = [];
  if (way == 1) {
    newNums = nums.sort((a, b) => a - b > 0);
    for (let i = 1; i < newNums.length; i++) {
      if (newNums[i] === newNums[i - 1]) {
        return false
      }
    }
  } else {
    newNums = [...new Set(nums)];
    console.log(newNums);
    return newNums.length === nums.length;
  }
  return true;
}

duplicateElement([1, 2, 3, 4, 1, 2, 3], 1);

/**
 * 无重复字符的最长子串
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * "abcabcbb" 输出 3 ===> abc
 * “bbbbb” 输出1 ===> b
 *
 * 
 * 1、用一个字符串来存储字符 
 * 2、如果有重复的就先加到后面 
 * 3、然后截取第一个重复的字符 
 * 4、遍历结束 最后的string 就是不重复的子串
 */

const str = 'abcabccbscdefg'; // 7 ====> bscdegf

function longestStr(str) {
  let string = '';
  for (const s of str) {
    if (string.indexOf(s) === -1) {
      string += s;
    } else {
      string += s;
      string = string.slice(string.indexOf(s) + 1);
    }
  }
  return string.length;
}

longestStr(str);

