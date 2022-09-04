import { BrowserRouter } from 'react-router-dom';


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


// BrowserRouter

export interface BrowserHistory extends History { }

export interface HashHistory extends History { }

const readOnly: <T>(obj: T) => Readonly<T> = true
  ? (obj) => Object.freeze(obj)
  : (obj) => obj;

type HistoryState = {
  usr: any;
  key?: string;
  idx: number;
};

const BeforeUnloadEventType = "beforeunload";
const HashChangeEventType = "hashchange";
const PopStateEventType = "popstate";

export type BrowserHistoryOptions = { window?: Window };


// Browser History 依赖 服务端配置 URLS
export function createBrowserHistory(
  options: BrowserHistoryOptions = {}
): BrowserHistory {

  let { window = document.defaultView! } = options;
  let globalHistory = window.history;


  function getIndexAndLocation(): [number, Location] {
    let { pathname, search, hash } = window.location;

    let state = globalHistory.state || {};

    return [
      state.idx,
      readOnly<Location>({
        pathname,
        search,
        hash,
        state: state.usr || null,
        key: state.key || "default",
      }),
    ];
  }

  
}


































