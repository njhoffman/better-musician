import React, { PureComponent } from 'react';
import JSONTree from 'react-json-tree';
import stringify from 'javascript-stringify';
import getItemString from './getItemString';
import getJsonTreeTheme from './getJsonTreeTheme';

import { LabelRenderer } from 'react-json-tree';
import { Delta, ArrayDelta } from 'jsondiffpatch';
import { StylingFunction, Base16Theme, StylingConfig } from 'react-base16-styling';

function stringifyAndShrink(val, isWideLayout) {
  if (val === null) { return 'null'; }

  const str = stringify(val);
  if (typeof str === 'undefined') { return 'undefined'; }

  if (isWideLayout) return str.length > 42 ? str.substr(0, 30) + '…' + str.substr(-10) : str;
  return str.length > 22 ? `${str.substr(0, 15)}…${str.substr(-5)}` : str;
}

const expandFirstLevel = (keyName, data, level) => level <= 1;

function prepareDelta(value) {
  if (value && value._t === 'a') {
    const arrayDelta: ArrayDelta = (value: any);
    const res = {};
    for (let key in arrayDelta) {
      if (key !== '_t') {
        if (key[0] === '_' && !arrayDelta[key.substr(1)]) {
          res[key.substr(1)] = arrayDelta[key];
        } else if (arrayDelta['_' + key]) {
          res[key] = [arrayDelta['_' + key][0], arrayDelta[key][0]];
        } else if (!arrayDelta['_' + key] && key[0] !== '_') {
          res[key] = arrayDelta[key];
        }
      }
    }
    return res;
  }

  return value;
}

const getStateFromProps = props => ({
  theme: getJsonTreeTheme(props.base16Theme)
});

export default class JSONDiff extends PureComponent {

  constructor(props) {
    super(props);
    this.state = getStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.base16Theme !== this.props.base16Theme) {
      this.setState(getStateFromProps(nextProps))
    }
  }

  render() {
    const { styling, labelRenderer, invertTheme, expandDiffs, delta } = this.props;

    if (!delta) {
      return (
        <div {...styling('stateDiffEmpty')}>
          (states are equal)
        </div>
      );
    }

    return (
      <JSONTree
        labelRenderer={labelRenderer}
        invertTheme={invertTheme}
        theme={this.state.theme}
        data={delta}
        getItemString={this.getItemString}
        valueRenderer={this.valueRenderer}
        postprocessValue={prepareDelta}
        isCustomNode={Array.isArray}
        shouldExpandNode={expandDiffs ? () => true : expandFirstLevel}
        hideRoot
      />
    );
  }

  valueRenderer = (raw, value) => {
    const { styling, isWideLayout } = this.props;

    function renderSpan(name, body) {
      return (
        <span key={name} {...styling(['diff', name])}>{body}</span>
      );
    }

    if (Array.isArray(value)) {
      switch(value.length) {
      case 1:
        return (
          <span {...styling('diffWrap')}>
            {renderSpan('diffAdd', stringifyAndShrink(value[0], isWideLayout))}
          </span>
        );
      case 2:
        return (
          <span {...styling('diffWrap')}>
            {renderSpan('diffUpdateFrom', stringifyAndShrink(value[0], isWideLayout))}
            {renderSpan('diffUpdateArrow', ' => ')}
            {renderSpan('diffUpdateTo', stringifyAndShrink(value[1], isWideLayout))}
          </span>
        );
      case 3:
        return (
          <span {...styling('diffWrap')}>
            {renderSpan('diffRemove', stringifyAndShrink(value[0], isWideLayout))}
          </span>
        );
      }
    }

    return raw;
  }

  getItemString = (type, data) => {
    return getItemString(this.props.styling, type, data, this.props.isWideLayout, true);
  };
}

