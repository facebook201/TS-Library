import memoizeOne from 'memoize-one';
import { createElement, PureComponent } from 'react';
import { cancelTimeout, requestTimeout } from './timer';
import { getRTLOffsetType } from './domHelpers';

const IS_SCROLLING_DEBOUNCE_INTERVAL = 150;

const defaultItemKey = (index, data) => index;





export default function createListComponent({
  getItemOffset,
  getEstimatedTotalSize,
  getItemSize,
  getOffsetForIndexAndAlignment,
  getStartIndexForOffset,
  getStopIndexForStartIndex,
  initInstanceProps,
  shouldResetStyleCacheOnItemSizeChange,
  validateProps,
}) {
  // 最后返回的 List
  return class List extends PureComponent {
    _intanceProps = initInstanceProps(this.props, this);
    _outerRef; //HTMLDivElement;
    _resetIsScrollingTimeoutId = null;

    static defaultProps = {
      direction: 'ltr',
      
    };

  }
}

