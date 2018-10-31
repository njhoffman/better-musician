import React, { PureComponent }  from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { init as initLog } from 'shared/logger';

const { warn } = initLog('newWindow');

function toWindowFeatures(obj) {
  return Object.keys(obj)
    .reduce((features, name) => {
      const value = obj[name];
      if (typeof value === 'boolean') {
        features.push(`${name}=${value ? 'yes' : 'no'}`);
      } else {
        features.push(`${name}=${value}`);
      }
      return features;
    }, [])
    .join(',');
}

function createNewStyleElement(source, rules) {
  const newStyleEl = source.createElement('style');

  // Write the text of each rule into the body of the style element
  Array.from(rules).forEach(cssRule => {
    const { cssText, type } = cssRule;
    let returnText = cssText;
    // Check if the cssRule type is CSSImportRule (3) or CSSFontFaceRule (5)
    // to handle local imports on a about:blank page
    // '/custom.css' turns to 'http://my-site.com/custom.css'
    if ([3, 5].includes(type)) {
      returnText = cssText
        .split('url(')
        .map(line => {
          if (line[1] === '/') {
            return `${line.slice(0, 1)}${
              window.location.origin
            }${line.slice(1)}`;
          }
          return line;
        })
        .join('url(');
    }
    newStyleEl.appendChild(source.createTextNode(returnText));
  });
  return newStyleEl;
}

const copySourceStyles = (source, target) => {
  Array.from(source.styleSheets).forEach(styleSheet => {
    const isStyledComponent = styleSheet.ownerNode.attributes['data-styled-components'];
    // For <style> elements
    let rules;
    try {
      rules = styleSheet.cssRules;
    } catch (err) {
      // console.error(err)
    }
    if (rules) {
      let newStyleEl = createNewStyleElement(source, rules);
      target.head.appendChild(newStyleEl);
      if (isStyledComponent) {
        const observer = new MutationObserver(mutations => {
          mutations.forEach(mutation => {
            const newRules = mutation.target.sheet.cssRules;
            const replaceEl = createNewStyleElement(source, newRules);
            newStyleEl.replaceWith(replaceEl);
            newStyleEl = replaceEl;
          });
        });
        observer.observe(styleSheet.ownerNode, { attributes: true, attributeFilter: ['data-styled-components'] });
      }
    } else if (styleSheet.href) {
      // for <link> elements loading CSS from a URL
      const newLinkEl = source.createElement('link');

      newLinkEl.rel = 'stylesheet';
      newLinkEl.href = styleSheet.href;
      target.head.appendChild(newLinkEl);
    }
  });
};


class NewWindow extends PureComponent {
  static defaultProps = {
    url: '',
    name: '',
    title: '',
    features: { width: '600px', height: '640px' },
    onBlock: null,
    onUnload: null,
    center: 'parent',
    copyStyles: true
  }

  constructor(props) {
    super(props);
    this.container = document.createElement('div');
    this.window = null;
    this.windowCheckerInterval = null;
    this.released = false;
    this.state = {
      mounted: false
    };
  }

  componentDidMount() {
    this.openChild();
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    // close the opened window (if any) when NewWindow will unmount.
    if (this.window) {
      this.window.close();
    }
  }

  openChild() {
    const { url, title, name, features, onBlock, center, copyStyles } = this.props;
    const { top, innerWidth, innerHeight, screenTop, screenLeft } = window;
    const { clientWidth, clientHeight } = document.documentElement;
    /* eslint-disable no-restricted-globals */
    const { width: scrWidth, height: scrHeight, left: scrLeft, top: scrTop } = screen;
    /* eslint-enable no-restricted-globals */

    // Prepare position of the new window to be centered against the 'parent' window or 'screen'.
    if (typeof center === 'string' && (!features.width || !features.height)) {
      warn('width and height window features must be present when a center prop is provided');
    } else if (center === 'parent') {
      features.left = top.outerWidth / 2 + top.screenX - features.width / 2;
      features.top = top.outerHeight / 2 + top.screenY - features.height / 2;
    } else if (center === 'screen') {
      const width = innerWidth || clientWidth || scrWidth;
      const height = innerHeight || clientHeight || scrHeight;

      features.left = width / 2 - features.width / 2 + (screenLeft || scrLeft);
      features.top = height / 2 - features.height / 2 + (screenTop || scrTop);
    }

    // Open a new window.
    this.window = window.open(url, name, toWindowFeatures(features));

    // When a new window use content from a cross-origin there's no way we can attach event
    // to it. Therefore, we need to detect in a interval when the new window was destroyed
    // or was closed.
    this.windowCheckerInterval = setInterval(() => {
      if (!this.window || this.window.closed) {
        this.release();
      }
    }, 50);

    // Check if the new window was succesfully opened.
    if (this.window) {
      this.window.document.title = title;
      this.window.document.body.appendChild(this.container);

      // If specified, copy styles from parent window's document.
      if (copyStyles) {
        setTimeout(() => copySourceStyles(document, this.window.document), 0);
      }

      // Release anything bound to this component before the new window unload.
      this.window.addEventListener('beforeunload', () => this.release());
      window.onunload = () => {
        if (this.window) {
          this.window.close();
        }
      };
    } else if (typeof onBlock === 'function') {
      // Handle error on opening of new window.
      onBlock();
    } else {
      warn('A new window could not be opened. Maybe it was blocked.');
    }
  }


  release() {
    // Release the new window and anything that was bound to it.
    if (this.released) {
      return;
    }
    this.released = true;

    // Remove checker interval.
    clearInterval(this.windowCheckerInterval);

    // Call any function bound to the `onUnload` prop.
    const { onUnload } = this.props;

    if (typeof onUnload === 'function') {
      onUnload();
    }
  }

  render() {
    const { children } = this.props;
    const { mounted } = this.state;
    if (!mounted) {
      return null;
    }
    const newChildren = React.Children.map(children, child => (
      React.cloneElement(child, ...{ parentWindow: this.window })
    ));
    return ReactDOM.createPortal(newChildren, this.container);
  }
}

NewWindow.propTypes = {
  children:   PropTypes.node.isRequired,
  url:        PropTypes.string,
  name:       PropTypes.string,
  title:      PropTypes.string,
  features:   PropTypes.instanceOf(Object),
  onUnload:   PropTypes.func,
  onBlock:    PropTypes.func,
  center:     PropTypes.oneOf(['parent', 'screen']),
  copyStyles: PropTypes.bool
};

/**
 * Copy styles from a source document to a target.
 */

export default NewWindow;
