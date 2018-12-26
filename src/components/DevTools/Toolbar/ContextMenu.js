import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import createStyledComponent from './styles/createStyledComponent';
import styles from './styles/ContextMenu';

const ContextMenuWrapper = createStyledComponent(styles);

export default class ContextMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      parentKey: props.parentKey || 'root',
      activeSubmenu: null
    };
    this.items = props.items;
    this.update();
  }

  componentWillReceiveProps(nextProps) {
    this.update();
    // if (!isEqual(nextProps.items, this.props.items) ||
    //   nextProps.visible !== this.props.visible) {
    //   this.updateItems(nextProps.items);
    //   this.update();
    // } else {
    // }
  }

  componentDidMount() {
    this.amendPosition();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.x !== this.props.x || prevProps.y !== this.props.y) {
      this.amendPosition();
    }
  }

  onMouseUp = e => {
    e.target.blur();
  };

  amendPosition() {
    const { x, y } = this.props;
    const { scrollTop, scrollLeft } = document.documentElement;
    const { innerWidth, innerHeight } = window;
    const rect = this.menu.getBoundingClientRect();
    let left = x + scrollLeft;
    let top = y + scrollTop;

    if (y + rect.height > innerHeight) {
      top = innerHeight - rect.height;
    }
    if (x + rect.width > innerWidth) {
      left = innerWidth - rect.width;
    }
    if (top < 0) {
      top = rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
    }
    if (left < 0) {
      left = rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
    }

    this.menu.style.top = `${top}px`;
    this.menu.style.left = `${left}px`;
  }

  updateMenu() {
    const { buttonProps } = this.props;
    this.menuItems = this.items.map(item => {
      const { name, key, label, value, type, parentKey, icon, className} = item;
      const buttonStyle = { paddingRight: `${icon ? '25px' : ''}` };
      if (type === 'button') {
        return item;
      }
      return (
        <button
          key={key}
          value={value}
          name={name}
          className={`${className || ''}`}
          data-key={key}
          data-parentkey={parentKey}
          style={buttonStyle}
          {...buttonProps}>
          {label || name}
          {icon}
        </button>
      );
    });
  }

  update() {
    this.updateMenu();
  }

  menuRef = (c) => {
    this.menu = c;
  };

  render() {
    const { visible, x, y, theme, wrapperClass, wrapperProps } = this.props;
    return (
      <ContextMenuWrapper
        innerRef={this.menuRef}
        className={wrapperClass}
        left={x}
        top={y}
        theme={theme}
        visible={visible}
        {...wrapperProps}>
        {this.menuItems}
      </ContextMenuWrapper>
    );
  }
}

ContextMenu.propTypes = {
  items: PropTypes.array.isRequired,
  buttonProps: PropTypes.instanceOf(Object),
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  visible: PropTypes.bool
};
