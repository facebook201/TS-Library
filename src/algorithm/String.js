/**
 * KMP 字符串匹配算法
 * pat 子串 长度M
 * txt 文本串 长度 N
 * 先在开头约定，本文用 pat 表示模式串，长度为 M，txt 表示文本串，
 * 长度为 N。KMP 算法是在 txt 中查找子串 pat，如果存在，返回这个子串的起始索引，否则返回 -1。
 */






/**
 * 首先使用 暴力破解
 **/

let txt = 'aaacaab';
let pat = 'aaab';

function searchChildString(pat, txt) {
  let M = pat.length;
  let N = txt.length;

  for (let i = 0; i < N - M; i++) {
    let j;
    for (j = 0; i < M; j++) {
      if (pat[j] !== txt[i]) {
        break;
      }
    }
    if (j === M) return i;
  }
  return -1;
}