

export enum Action {
  Pop = 'POP',

  Push = 'PUSH',
  // 替换
  Replace = 'REPLACE',
}

// URL pathname
export type Pathname = String;

// URL Seacrh 字符 以 ?. 开头
export type Search = string;

export type Hash = String;

export type State = unknown;

export type Key = string;

// pathname search hash Values of URL
export interface Path {
  pathname: Pathname;

  search: Search;

  hash: Hash;
};

export interface Location extends Path {
  state: unknown;

  key: Key;
}

export type PartialPath = Partial<Path>;

export interface Update {
  action: Action;

  location: Location;
}

export interface Listener {
  (update: Update): void;
}

export interface Transition extends Update {
  retry(): void
}

export interface Blocker {
  (tx: Transition): void;
}

export type To = string | Partial<Path>;


export interface History {
  readonly action: Action;

  readonly location: Location;

  createHref(to: To): String;

  push(to: To, state?: any): void;

  replace(to: To, state?: any): void;

  go(delta: number): void;

  back(): void;

  forward(): void;

  // 设置监听器
  listen(listener: Listener): () => void;

  // 
  block(blocker: Blocker): () => void;
}




































