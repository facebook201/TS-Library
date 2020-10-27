import createStoreShape from '../utils/createStoreShape';
import { Children } from 'react';

function isUsingOwnerContext(React) {
  const { version } = React;
  if (typeof version !== 'string') {
    return true;
  }

  const sections = version.split('.');
  const major = parseInt(sections[0], 10);
  const minor = parseInt(sections[1], 10);

  return major === 0 && minor === 13;
}

export default function createProvider(React) {
  const { Component, PropTypes, Children } = React;

  const storeShape = createStoreShape(PropTypes);
  const requireFunctionChild = isUsingOwnerContext(React);

  let didWarnAboutChild = false;


  class Provider extends Component {
    getChildContext() {
      return {
        store: this.store
      };
    }

    constructor(props, context) {
      super(props, context);
      this.store = props.store;
    }

    componentWillReceiveProps(nextProps) {
      const { store } = this;
      const { store: nextStore } = nextProps;
    }

    render() {
      let children = this.props;

      if (typeof children === 'function') {
        children = children();
      } else {
        //
      }
      return Children.only(children);
    }
  }

  Provider.childContextTypes = {
    store: storeShape.isRequired
  };
  Provider.propTypes = {
    store: storeShape.isRequired,
    children: (requireFunctionChild ?
      PropTypes.func :
      PropTypes.element
    ).isRequired
  };

  return Provider;
};

