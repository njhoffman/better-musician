import { Component, createElement } from 'react';

/**
 * Creates a component class that renders the given Material UI component
 *
 * @param MaterialUIComponent The material ui component to render
 * @param mapProps A mapping of props provided by redux-form to the props the Material UI
 * component needs
 */

const isStateLess = Component => !Component.prototype.render;

export default function createComponent(MaterialUIComponent, mapProps) {
  class InputComponent extends Component {
    getRenderedComponent() {
      return this.component;
    }

    render() {
      return createElement(MaterialUIComponent, {
        ...mapProps(this.props),
        ref: (!isStateLess(MaterialUIComponent) ? el => (this.component = el) : null)
      });
    }
  }
  InputComponent.displayName = `ReduxFormMaterialUI${MaterialUIComponent.name}`;
  return InputComponent;
}
