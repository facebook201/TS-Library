
import React, { useContext, useEffect, useMemo, useRef } from 'react';

const EMPTY_ARRAY = [null, 0];
const NO_SUBSCRIPTION_ARRAY = [null, null];

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
      WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const displayName = `Connect(${wrappedComponentName})`;

    const selectorFactoryOptions = {
      shouldHandleStateChanges,
      displayName,
      wrappedComponentName,
      WrappedComponent,
      initMapStateToProps,
      initMapDispatchToProps,
      initMergeProps,
      areStatesEqual,
      areStatePropsEqual,
      areOwnPropsEqual,
      areMergedPropsEqual,
    };

    function ConnectFunction(props) {
      const [propsContext, reactReduxForwardedRef, wrapprProps] = useMemo(() => {
        const { reactReduxForwardedRef, ...wrapperProps } = props;

        return [props.context, reactReduxForwardedRef, wrapperProps];
      }, [props]);

      const ContextToUse = useMemo(() => {

        return propsContext &&
          propsContext.Consumer &&
          isContextConsumer(<propsContext.Consumer />)
          ? propsContext
          : Context;
      }, [propsContext, Context]);

      const contextValue = useContext(ContextToUse);

      const didStoreComeFromProps =
        Boolean(props.store) &&
        Boolean(props.store.getState) &&
        Boolean(props.store.dispatch);

      const didStoreComeFromContext =
        Boolean(contextValue) && Boolean(contextValue.store);

      
      // Based on the previous check, one of these must be true
      const store = didStoreComeFromProps
      ? props.store
      : contextValue.store

      const getServerState = didStoreComeFromContext
      ? contextValue.getServerState
      : store.getState

      const childPropsSelector = useMemo(() => {
        return defaultSelectorFactory(store.dispatch, selectorFactoryOptions)
      }, [store])

      const [subscription, notifyNestedSubs] = useMemo(() => {
      if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY

      const subscription = createSubscription(
        store,
        didStoreComeFromProps ? undefined : contextValue.subscription
      )

      const notifyNestedSubs =
        subscription.notifyNestedSubs.bind(subscription)

        return [subscription, notifyNestedSubs]
      }, [store, didStoreComeFromProps, contextValue])

      const overriddenContextValue = useMemo(() => {
        if (didStoreComeFromProps) {
          return contextValue;
        }

        return {
          ...contextValue,
          subscription,
        }
      }, [didStoreComeFromProps, contextValue, subscription])

      const lastChildProps = useRef();
      const lastWrapperProps = useRef(wrapperProps)
      const childPropsFromStoreUpdate = useRef()
      const renderIsScheduled = useRef(false)
      const isProcessingDispatch = useRef(false)
      const isMounted = useRef(false)

      const latestSubscriptionCallbackError = useRef()

      useEffect(() => {
        isMounted.current = true
        return () => {
          isMounted.current = false
        }
      }, [])

      const actualChildPropsSelector = useMemo(() => {
        const selector = () => {
          if (
            childPropsFromStoreUpdate.current &&
            wrapperProps === lastWrapperProps.current
          ) {
            return childPropsFromStoreUpdate.current
          }

          return childPropsSelector(store.getState(), wrapperProps)
        }
        return selector
      }, [store, wrapperProps])


      const subscribeForReact = useMemo(() => {
        const subscribe = (reactListener) => {
          if (!subscription) {
            return () => {}
          }

          return subscribeUpdates(
            shouldHandleStateChanges,
            store,
            subscription,
            // @ts-ignore
            childPropsSelector,
            lastWrapperProps,
            lastChildProps,
            renderIsScheduled,
            isMounted,
            childPropsFromStoreUpdate,
            notifyNestedSubs,
            reactListener
          )
        }

      return subscribe;
      }, [subscription])

      useIsomorphicLayoutEffectWithArgs(captureWrapperProps, [
        lastWrapperProps,
        lastChildProps,
        renderIsScheduled,
        wrapperProps,
        childPropsFromStoreUpdate,
        notifyNestedSubs,
      ])

      let actualChildProps;

      try {
        actualChildProps = useSyncExternalStore(
          actualChildPropsSelector,
          getServerState
            ? () => childPropsSelector(getServerState(), wrapperProps)
            : actualChildPropsSelector
        )
      } catch (err) {}

      const renderedWrappedComponent = useMemo(() => {
        return (
          <WrappedComponent
            {...actualChildProps}
            ref={reactReduxForwardedRef}
          />
        )
      }, [reactReduxForwardedRef, WrappedComponent, actualChildProps])

      const renderedChild = useMemo(() => {
        if (shouldHandleStateChanges) {
          return (
            <ContextToUse.Provider value={overriddenContextValue}>
              {renderedWrappedComponent}
            </ContextToUse.Provider>
          )
        }
        return renderedWrappedComponent;
      }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);

      return renderedChild
    }

    const _Connect = React.memo(ConnectFunction)

    const Connect = _Connect;
    Connect.WrappedComponent = WrappedComponent
    Connect.displayName = ConnectFunction.displayName = displayName

    if (forwardRef) {
      const _forwarded = React.forwardRef(function forwardConnectRef(props, ref) {
        return <Connect {...props} reactReduxForwardedRef={ref} />
      })

      const forwarded = _forwarded;
      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComponent;
      
      return hoistStatics(forwarded, WrappedComponent);
    }

    return hoistStatics(Connect, WrappedComponent);
  }
  
  return wrapWithConnect;
}

export default connect;
