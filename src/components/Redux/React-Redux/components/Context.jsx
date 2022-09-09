import { createContext } from "react";




// export interface ReactReduxContextValue<
//   SS = any,
//   A extends Action = AnyAction
// > {
//   store: Store<SS, A>
//   subscription: Subscription
//   getServerState?: () => SS
// }

// {
//   store: Store,
//   subscription,
// }
export const ReactReduxContext =  createContext(null);

ReactReduxContext.displayName = 'ReactRedux';

