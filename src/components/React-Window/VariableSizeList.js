// @flow

import createListComponent from './createListComponent';

const DEFAULT_ESTIMATED_ITEM_SIZE = 50;

type ItemMetadata = {
  offset: number,
  size: number
};

const getItemMetadata = (
  props,
  index,
  instanceProps,
) => {

  const { itemSize } = props;
  const { ItemMetadataMap, lastMeasuredIndex } = instanceProps;

  if (index > lastMeasuredIndex) {
    let offset = 0;
    if (lastMeasuredIndex >= 0) {
      const ItemMetadata = ItemMetadataMap[lastMeasuredIndex];
      offset = ItemMetadata.offset + ItemMetadata.size;
    }

    for (let i = lastMeasuredIndex + 1; i <= index; i++) {
      let size = itemSize[i];

      ItemMetadataMap[i] = {
        offset, size
      };

      offset += size;
    }
    instanceProps.lastMeasuredIndex = index;
  }
  return ItemMetadataMap[index];
};

const VariableSizeList = createListComponent({
  // 获取元素的 偏移量
  getItemOffset: (props, index, instanceProps) => getItemMetadata(props, index, instanceProps).offset,

  // 获取元素的Size

  
});
