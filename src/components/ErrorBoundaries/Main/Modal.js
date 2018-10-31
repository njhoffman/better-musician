import { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export default class Modal extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.object
    ]).isRequired
  };

  constructor(props) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    document.body.removeChild(this.el);
  }

  render() {
    // Use a portal to render the children into the element
    const { children } = this.props;
    return createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      children,
      // A DOM element
      this.el
    );
  }
}
