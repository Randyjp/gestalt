// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './IconButton.css';
import icons from './icons/index.js';
import Pog from './Pog.js';

type Props = {|
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityLabel: string,
  bgColor?:
    | 'transparent'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'white'
    | 'blue',
  dangerouslySetSvgPath?: { __path: string },
  disabled?: boolean,
  iconColor?: 'gray' | 'darkGray' | 'red' | 'blue' | 'white' | 'orange',
  icon?: $Keys<typeof icons>,
  onClick?: ({ event: SyntheticMouseEvent<> }) => void,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
|};

type State = {|
  active: boolean,
  focused: boolean,
  hovered: boolean,
|};

export default class IconButton extends React.Component<Props, State> {
  static propTypes = {
    accessibilityExpanded: PropTypes.bool,
    accessibilityHaspopup: PropTypes.bool,
    accessibilityLabel: PropTypes.string.isRequired,
    bgColor: PropTypes.oneOf([
      'transparent',
      'transparentDarkGray',
      'gray',
      'lightGray',
      'white',
      'blue',
    ]),
    dangerouslySetSvgPath: PropTypes.shape({
      __path: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    icon: PropTypes.oneOf(Object.keys(icons)),
    iconColor: PropTypes.oneOf([
      'gray',
      'darkGray',
      'red',
      'blue',
      'white',
      'orange',
    ]),
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  };

  state = {
    active: false,
    focused: false,
    hovered: false,
  };

  handleBlur = () => this.setState({ focused: false });

  handleFocus = () => this.setState({ focused: true });

  handleMouseDown = () => this.setState({ active: true });

  handleMouseEnter = () => this.setState({ hovered: true });

  handleMouseLeave = () => this.setState({ active: false, hovered: false });

  handleMouseUp = () => this.setState({ active: false });

  render() {
    const {
      accessibilityExpanded,
      accessibilityHaspopup,
      accessibilityLabel,
      bgColor,
      dangerouslySetSvgPath,
      disabled,
      iconColor,
      icon,
      size,
      onClick,
    } = this.props;

    const { active, focused, hovered } = this.state;

    return (
      <button
        aria-expanded={accessibilityExpanded}
        aria-haspopup={accessibilityHaspopup}
        aria-label={accessibilityLabel}
        className={classnames(
          styles.button,
          disabled ? styles.disabled : styles.enabled
        )}
        disabled={disabled}
        onBlur={this.handleBlur}
        onClick={event => onClick && onClick({ event })}
        onFocus={this.handleFocus}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        type="button"
      >
        <Pog
          active={!disabled && active}
          bgColor={bgColor}
          dangerouslySetSvgPath={dangerouslySetSvgPath}
          focused={!disabled && focused}
          hovered={!disabled && hovered}
          iconColor={iconColor}
          icon={icon}
          size={size}
        />
      </button>
    );
  }
}
