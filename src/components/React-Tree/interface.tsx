import * as React from 'react';
import { TreeNodeProps } from './TreeNode';


export interface BasicDataNode {
  checkable?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  isLeaf?: boolean;
  selectable?: boolean;

  /** Set style of TreeNode. This is not recommend if you don't have any force requirement */
  className?: string;
  style?: React.CSSProperties;
}

export type FieldDataNode<T, ChildFileName extends string = 'children'> = BasicDataNode &
  T &
  Partial<Record<ChildFileName, FieldDataNode<Target, ChildFileName>[]>>;

export type DataNode = FieldDataNode<{
  key: string | number;
  title?: React.ReactNode | ((data: DataNode) => React.ReactNode);
}>;


export type EventDataNode<TreeDataType> = {
  key: React.Key;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  loaded: boolean;
  loading: boolean;
  halfChecked: boolean;
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
  pos: string;
  active: boolean;
} & TreeDataType &
  BasicDataNode;

export type Key = string | number;


// * NodeElement
export type NodeElement = React.ReactElement<TreeNodeProps> & {
  selectHandle?: HTMLSpanElement,
  type: {
    isTreeNode: boolean,
  }
}

export interface Entity {
  node: NodeElement;
  index: number;
  key: Key;
  pos: string;
  parent?: Entity;
  children?: Entity[];
}

export interface DataEntity<TreeDataType extends BasicDataNode = DataNode>
  extends Omit<Entity, 'node' | 'parent' | 'children'> {
  node: TreeDataType;
  nodes: TreeDataType[];
  parent?: DataEntity<TreeDataType>;
  children?: DataEntity<TreeDataType>[];
  level: number;
}

export interface FlattenNode<TreeDataType extends BasicDataNode = DataNode> {
  parent: FlattenNode<TreeDataType> | null;
  children: FlattenNode<TreeDataType>[];
  pos: string;
  data: TreeDataType;
  title: React.ReactNode;
  key: Key;
  isStart: boolean[];
  isEnd: boolean[];
}

export type GetKey<RecordType> = (record: RecordType, index?: number) => Key;

export type GetCheckDisabled<RecordType> = (record: RecordType) => boolean;

export type Direction = 'ltr' | 'rtl' | undefined;

export interface FieldNames {
  title?: string;
  /** @private Internal usage for `rc-tree-select`, safe to remove if no need */
  _title?: string[];
  key?: string;
  children?: string;
}

