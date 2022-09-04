import React from 'react';
import { matchPath } from 'react-router-dom';
import RouterContext from './RouterContext';



class Router extends React.Component {

  // context value
  // {
  //   history: this.props.history,
  //   location: this.state.location,
  //   match: Router.computeRootMatch(this.state.location.pathname),
  //   staticContext: this.props.staticContext
  // }

  render() {
    return (
      <RouterContext.Consumer>
        {
          context => {
            const location = this.props.location || context.location;
            const match = this.props.computedMatch
              ? this.props.computedMatch
              : this.props.path
              ? matchPath(location.pathname, this.props)
              : context.match;

            const props = { ...context, location, match };

            let { children, component, render } = this.props;

            if (Array.isArray(children) && children.length === 0) {
              children = null;
            }

            return (
              <RouterContext.Provider value={props}>
                {
                  props.match
                  ? children
                    ? typeof children === "function"
                      ? __DEV__
                        ? evalChildrenDev(children, props, this.props.path)
                        : children(props)
                      : children
                    : component
                    ? React.createElement(component, props)
                    : render
                    ? render(props)
                    : null
                  : typeof children === "function"
                  ? __DEV__
                    ? evalChildrenDev(children, props, this.props.path)
                    : children(props)
                  : null
                }
            </RouterContext.Provider>
            );
          }
        }
      </RouterContext.Consumer>
    );
  }
}
