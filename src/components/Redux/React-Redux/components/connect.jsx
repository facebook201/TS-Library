
import React, { useContext, useMemo, useRef } from 'react';




function connect(
  mapStateToProps, // 一个函数从 state 中取值
  mapDispatchToProps, // 设置 dispatch action 动作
  mergeProps, // 把 ownProps 一起合并
  {
    context = ReactReduxContext,
  }
) {

  const Context = context;

  const initMapStateToProps = mapStateToPropsFactory(mapStateToProps);
  const initMapDispatchToProps = mapDispatchToPropsFactory(mapDispatchToProps);
  const initMergeProps = mergePropsFactory(mergeProps);
  const shouldHandleStateChanges = Boolean(mapStateToProps);





  const wrapWithConnect = (WrappedComponent) => {
    const wrappedComponentName =
      WrappedComponent.displayName || WrappedComponent.name || 'Component'

    const displayName = `Connect(${wrappedComponentName})`

    
  };




}
















