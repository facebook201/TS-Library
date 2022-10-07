
/**
 * KMP 字符串匹配 子串是否存在主串 S 中 返回其位置
 */
const string =      'AAAAABCBAAAAB'; // 13
const childString = 'AAAB'; // 4

/**
 * S 是主串 P 是子串
 * 暴力破解 时间复杂度是 O(n * m) n 是循环次数，m 是子串的长度
 **/ 
function bruteFore(S, P) {
  if (S.length === 0 || S.length < P.length) return false;

  const Slen = S.length;
  const Plen = P.length;
  const position = [];

  for (let i = 0; i <= Slen - Plen; i++) {
    if (P === S.slice(i, i + Plen)) {
      position.push(i);
    }
  }
  console.log(position);
  return position;
}

bruteFore(string, childString);

/**
 * * 字符串比较的复杂度只能逐个比较字符，所以需要从降低趟数。
 * * —如果 S[i, i+len(P)] 与 P 的匹配是在第 r 个位置失败的，
 * * 那么从 S[i] 开始的 (r-1) 个连续字符，一定与 P 的前 (r-1) 个字符一模一样！
 * 
 * * 跳过不可能的字符串比较
 */
