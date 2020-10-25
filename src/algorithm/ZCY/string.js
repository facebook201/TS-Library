/**
 * 政采云
 */

/**
 * 第一大类 字符串
 */

/** 
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转
 * 翻转整数
 * 示例 输入: 123 3  输出: 321 45 
 * 示例 输入: -123 7 输出: -321 89 
 * 示例 输入: 120    k输出 21
 */
function reverse(x) {
  if (typeof x !== 'number') return;

  const MAX = 2147483647;
  const MIN = -2147483648;

  const rest = x > 0 
    ? String(x).split('').reverse().join('')
    : String(x).slice(1).split('').reverse().join('');

  const result = x > 0 ? parseInt(rest, 10) : 0 - parseInt(rest, 10);

  if (rest <= Max && rest >= MIN) {
    return result;
  }
  return 0;
}


/**
 * 有效的字母异位词
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
 * 输入: s = "anagram", t = "nagaram"  输出: true
 */

function isAnagram(s, t) {
  if (s.length === 0 || t.length === 0) {
    return false;
  }
  const hash = {};

  for (const k of s) {
    hash[k] = hash[k] || 0;
    hash[k] += 1;
  }

  for (const k of t) {
    if (!hash[k]) {
      return false;
    }
    hash[k] -= 1;
  }
  return true;
}

/**
 * 最长公共前缀
 * 编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 ""。
 * 输入: ["flower","flow","flight"] 输出: "fl"
 */

/**
 * 解题思路
 * 1、如果要查所有数组元素的最长公共前缀，那么我们可以拆解
 * lastCommonPrefix([s1, ..., sn]) = findCommonPrefix(lastCommonPrefix([s1, ..., sn-1]), sn);
 * 然后求出最后一项前面的，再跟最后一项比较就可以，就可以分步一直拆解
 */

function findCommonPrefix(s1, s2) {
  if (s1.length === 0 || s2.length === 0) {
    return '';
  }
  let len = s1.length > s2.length ? s2.length : s1.length;
  let common = '';

  for (let i = 0; i < len; i++) {
    if (s1[i] === s2[i]) {
      common += s1[i];
    }
  }
  return common;
}

function lastCommonPrefix(strArr) {
  // 递归退出的条件
  if (strArr.length > 2) {
    return lastCommonPrefix(strArr.slice(0, -1));
  } else {
    return findCommonPrefix(strArr[0], strArr[1]);
  }
}

const stringArray = ["flower","flow","flight"];

// 解法二
// 循环判断

function longestCommonPrefix(arr) {
  if (arr.length < 2) {
    return '';
  }

  let common = arr[0];
  let len = arr.length;
  let i = 1;

  while (i < len) {
    let j = 0;
    for (; j < arr[i].length; j++) {
      if (arr[i][j] !== common[j]) {
        break;    
      }
    }
    common = common.slice(0, j);
    i++;
  }
  return common;
}









