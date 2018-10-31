import { Component, createElement } from 'react';

const isStateLess = Comp => !Comp.prototype.render;

// A mapping of props provided by redux-form to the props the Material UI component needs
const createFormField = (MaterialUIComponent, mapProps) => {
  class InputComponent extends Component {
    getRenderedComponent() {
      return this.component;
    }

    render() {
      return createElement(MaterialUIComponent, {
        ...mapProps(this.props),
        ref: (!isStateLess(MaterialUIComponent) ? el => {
          this.component = el;
        } : null)
      });
    }
  }
  InputComponent.displayName = `ReduxFormMaterialUI${MaterialUIComponent.name}`;
  return InputComponent;
};

export default createFormField;
