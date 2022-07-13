import { Module } from "./modules/module";
import { vnode, VNode } from "./vnode";
import * as is from './is';
import { htmlDomApi, DOMAPI } from "./htmldomapi";

type VNodeQueue = VNode[];

export type Options = {
  experimental?: {
    fragments?: boolean;
  };
};

type ArraysOf<T> = {
  [K in keyof T]: Array<T[K]>;
};

const hooks: Array<keyof Module> = [
  "create",
  "update",
  "remove",
  "destroy",
  "pre",
  "post",
];

type ModuleHooks = ArraysOf<Required<Module>>;

export function init(
  modules: Array<Partial<Module>>,
  domApi?: DOMAPI,
  options?: Options
) {
  const cbs: ModuleHooks = {
    create: [],
    update: [],
    remove: [],
    destroy: [],
    pre: [],
    post: [],
  };

  const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi;

  for (const hook of hooks) {
    for (const module of modules) {
      const currentHook = module[hook];

      if (currentHook !== undefined) {
        (cbs[hook] as any[]).push(currentHook);
      }

    }
  }

  // 创建真正的节点
  function createElm(vnode: VNode, insertedVnodeQueue: VNodeQueue): VNode {
    
  }


}

