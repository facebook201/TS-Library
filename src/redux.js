import createStore from './components/Redux/createStore';

function reducer(state, action) {
  switch(action.type) {
    case 'ADD':
      return { count: action.count++ };
    case 'SUB':
      return { count: action.count-- };
    default:
      return state;
  }
}
 
const store = createStore(reducer, { count: 0 });

export {
  store,
};
