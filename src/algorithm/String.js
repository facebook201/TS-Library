
/**
 * 字符串匹配相关的算法
 */




/**
 * 1、BM 算法，匹配模式从字符串的尾部开始匹配。
 * 当字符不匹配的时候 可以跳过不止一个字符 利用率待搜索字符串的一些特征 加快了搜索步骤
 * 两个规则让模式串每次向右移动尽可能的距离
 * a: 坏字符规则：当文本串中的某个字符跟模式串的某个字符不匹配时，
 *    我们称文本串中的这个失配字符为坏字符，此时模式串需要向右移动，
 *    移动的位数 = 坏字符在模式串中的位置 - 坏字符在模式串中最右出现的位置。
 *    此外，如果"坏字符"不包含在模式串之中，则最右出现位置为 -1。坏字符针对的是文本串。
 * 
 * 
 * b: 好后缀规则（good-suffix shift）：当字符失配时，后移位数 = 好后缀在模式串中的位置 - 好后缀在模式串上一次出现的位置，
 *    且如果好后缀在模式串中没有再次出现，则为 -1。好后缀针对的是模式串。
 */


let text = 'here-is-a-simple-example';
let patter = 'example';

// 坏字符匹配
function patBadChar(txt, pat) {
  let P = pat.length;
  let badchar = null;
  let moveIndex = 0;

  for (let i = P - 1; i >= 0; i--) {
    // 如果不匹配就出现坏字符
    if (pat[i] !== text[i]) {
      badchar = text[i];
      let badIndex = pat.indexOf(badchar);
      // 那就判断是否存在前面的子串
      if (badIndex === -1) {
        moveIndex = i + 1;
        break;
      }
    }
  }
  return moveIndex;
}

console.log(BM(text, patter));


function generatebc(pattern) {
  const bc = new Array(256).fill(-1);
  for (let i = 0; i < pattern.length; i++) {
    const index = pattern[i].charCodeAt();
    bc[index] = i;
  }
  return bc;
}


function generateGS(pattern) {
  const len = pattern.length;
  const suffix = new Array(len).fill(-1);
  const prefix = new Array(len).fill(false);
  for (let i = 0; i < len - 1; i++) {
    let j = i;
    // 公共后缀子串长度
    let k = 0;
    while (j >= 0 && pattern[j] === pattern[len - 1 - k]) {
      j--;
      k++;
      suffix[k] = j + 1;
    }
    if (j === -1) {
      prefix[k] = true;
    }
  }
  return {
    suffix,
    prefix
  };
}

function moveByGS(badCharStartIndex, patternLength, suffix, prefix) {
  // 好后缀长度
  let k = patternLength - badCharStartIndex - 1;
  // 完全匹配
  if (suffix[k] !== -1) {
    return badCharStartIndex - suffix[k] + 1;
  }
  // 部分匹配
  for (let r = badCharStartIndex + 2; r <= patternLength - 1; r++) {
    if (prefix[patternLength - r]) {
      return r;
    }
  }
  return patternLength;
}

function BM(main, pattern) {
  const mainLen = main.length
  const patternLen = pattern.length
  const bc = generatebc(pattern)
  const { suffix, prefix } = generateGS(pattern)
  let step = 1
  
  // i, start index of main string
  for (let i = 0; i <= mainLen - patternLen; i = i + step) {
    let substr = main.slice(i, i + patternLen)
    const { patternBadCharIndex, mainBadCharIndex } = findBadChar(substr, pattern, bc)
    let stepForBC = mainBadCharIndex - patternBadCharIndex
    
    // mainBadCharIndex 坏字符出现的位置， 为 -1 时说明没有坏字符，在开始位置就匹配了
    if (mainBadCharIndex === -1) {
      return i
    }
    let stepForGS = -1;
  
    if (mainBadCharIndex < patternLen - 1) {
      stepForGS = moveByGS(patternBadCharIndex, patternLen, suffix, prefix)
     }
     step = Math.max(stepForBC, stepForGS)
  }
  return -1;
}


// 查找坏字符
function findBadChar(subStr, pattern, bc) {
  let len = subStr.length - 1;
  // 记录坏字符主串中的下标
  let j = -1;
  // 记录模式串中对应的坏字符下标
  let k = -1;
  let badChar = '';

  for (let i = length; i >= 0; i--) {
    if (subStr[i] !== pattern[i]) {
      j = i;
      badChar = subStr[i];
      break;
    }
  }

  if (j > 0) {
    k = bc[badChar.charCodeAt()];
  }

  return {
    mainBadCharIndex: j,
    patternBadCharIndex: k
  };
}


