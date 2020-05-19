"use strict";
/**
 * 二分查找
 * @param nums   从目标的数组查找
 * @param target 查找的目标值
 */
exports.__esModule = true;
var nums = [1, 2, 3, 4, 5, 6, 10, 21, 23, 63, 120, 203, 300];
function binarySearch(num, target) {
    var nums = num.slice();
    if (!nums.length)
        return -1;
    var left = 0;
    var right = nums.length - 1;
    while (left <= right) {
        var middle = Math.floor(left / 2 + right / 2);
        if (target === nums[middle]) {
            return middle;
        }
        else if (target > nums[middle]) {
            left = middle + 1;
        }
        else if (target < nums[middle]) {
            right = middle - 1;
        }
    }
    return -1;
}

console.log(binarySearch(nums, 23));

exports.binarySearch = binarySearch;
