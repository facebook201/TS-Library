import { useLayoutEffect } from "react";

import { createSubscription } from '../utils/Subscription'

function Provider({
  store,
  context,
  children,
  serverState,
}) {
  const contextValue = useMemo(() => {
    const subscription = createSubscription(store);
    
    return {
      store,
      subscription,
      getServerState: serverState ? () => serverState : undefined,
    };
  }, [store, serverState]);

  const previousState = useMemo(() => store.getState(), [store]);

  useLayoutEffect(() => {
    const { subscription } = contextValue;

    subscription.onStateChange = subscription.notifyNestedSubs;
    subscription.trySubscribe();

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }

    return () => {
      subscription.trySubscribe()
      subscription.onStateChange = undefined
    }
  }, [contextValue, previousState]);

  const Context = context || ReactReduxContext;

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export default Provider;
