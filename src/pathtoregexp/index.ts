/**
 * * path-to-regexp 把路径转为正则表达式 
 * * 
   * type 类型别名，给类型取一个新名字。使用type创建类型别名，可以用来表示 
 * * 对象类型、联合类型、元祖和交集。
 * * interface 仅限于描述对象类型，接口的声明语法也不同于类型别名的声明语法
 * * 
 * * 
 */
interface LexToken {
  type: 'OPEN'
    | 'CLOSE'
    | 'PATTERN'
    | 'NAME'
    | 'CHAR';
  index: number;
  value: string;
};

/**
 * * Tokenize input string 给字符串打标记
 */

function lexer(str: string, LexToken: []) {
  const tokens: LexToken[] = [];

  let i = 0;

  while (i < str.length) {
    const char = str[i];

  }
}

// key 的数据类型
export interface Key {
  name: string | number;
  prefix: string;
  suffix: string;
  pattern: string;
  modifier: string;
}

export type Token = string | Key;

/**
 * * Supported `path-to-regexp` input types
 */
export type Path = string | RegExp | Array<string | RegExp>;


export interface TokensToRegexpOptions {
  /**
   * When `true` the regexp will be case sensitive. (default: `false`)
   */
  sensitive?: boolean;
  /**
   * When `true` the regexp won't allow an optional trailing delimiter to match. (default: `false`)
   */
  strict?: boolean;
  /**
   * When `true` the regexp will match to the end of the string. (default: `true`)
   */
  end?: boolean;
  /**
   * When `true` the regexp will match from the beginning of the string. (default: `true`)
   */
  start?: boolean;
  /**
   * Sets the final character for non-ending optimistic matches. (default: `/`)
   */
  delimiter?: string;
  /**
   * List of characters that can also be "end" characters.
   */
  endsWith?: string;
  /**
   * Encode path tokens for use in the `RegExp`.
   */
  encode?: (value: string) => string;
}

export interface ParseOptions {
  /**
   * Set the default delimiter for repeat parameters. (default: `'/'`)
   */
  delimiter?: string;
  /**
   * List of characters to automatically consider prefixes when parsing.
   */
  prefixes?: string;
}

/**
 * * Normalize the given path string, returning a regular expression
 * * 规范化传入的字符串路径 返回一个正则表达式
 */
export function pathToRegexp(
  path: Path,
  keys: Key[],
  options?: TokensToRegexpOptions & ParseOptions
) {

}




