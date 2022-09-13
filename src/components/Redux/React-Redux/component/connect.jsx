import React, { useContext } from 'react';
import ReactReduxContext from './context';

// 第一层函数 接收 mapStateToProps 和 mapDispatchToProps
function connect(mapStateToProps, mapDispatchToProps) {
  // 第二层函数 是高阶函数 获取 context 
  return function connectHOC(WrappedComponent) {

    function ConnectFunction(props) {
      const { ...wrapperProps } = props;

      // 获取 context 的值
      const context = useContext(ReactReduxContext);
      const { store } = context;

      const state = store.getState();

      // 执行 mapStateToProps 和 mapDispatchToProps
      // 执行mapStateToProps和mapDispatchToProps
      const stateProps = mapStateToProps(state);
      const dispatchProps = mapDispatchToProps(store.dispatch);
 
      // 组装最终的props
      const actualChildProps = Object.assign({}, stateProps, dispatchProps, wrapperProps);
 
      // 渲染WrappedComponent
      return <WrappedComponent {...actualChildProps}></WrappedComponent>
    }

    return ConnectFunction;
  }
}

export default connect;
