import React from 'react';
import ReactReduxContext from './context';


function Provider(props) {
  const { store, children } = props;

  // 要传递的 context
  const contextValue = useMemo(() => {
    const subscription = new Subscription(store);

    subscription.onStateChange = subscription.notifyNestedSubs;

    return {
      store,
      subscription,
    };
  }, [store]);

  

  // 返回的
  return (
    <ReactReduxContext.Provider value={contextValue}>
      { children }
    </ReactReduxContext.Provider>
  );
}
