/**
 * 二分查找
 * @param nums   从目标的数组查找
 * @param target 查找的目标值
 */

let nums = [1, 2, 3, 4, 5, 6, 10, 21, 23, 63, 120, 203, 300];

export function binarySearch(num: number[], target: number): number {
  let nums = num.slice();
  if (!nums.length) return -1;

  let left = 0;
  let right = nums.length -1;

  while (left <= right) {
    let middle = Math.floor(left / 2 + right / 2);
    if (target === nums[middle]) {
      return middle;
    }
    else if (target > nums[middle]) {
      left = middle + 1;
    }
    else if (target < nums[middle]) {
      right = middle -1;
    }
  }
  return -1;
}
