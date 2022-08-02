
import React from 'react';

export interface StarProps {
  value?: number;
  index?: number;
  prefixCls?: string;
  allowHalf?: boolean;
  disabled?: boolean;
  onHover?: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => void;
  character?: React.ReactNode | ((props: StarProps) => React.ReactNode);
  characterRender?: (origin: React.ReactElement, props: StarProps) => React.ReactNode;
  focused?: boolean;
  count?: number;
};

export default class Star extends React.Component<StarProps> {
  onHover: React.MouseEventHandler<HTMLDivElement> = e => {
    const { onHover, index } = this.props;
    onHover(e, index);
  }








  render() {
    const { onHover, onClick, onKeyDown } = this;
    const { disabled, prefixCls, character, characterRender, index, count, value } = this.props; 
    
    const characterNode = typeof character === 'function' ? character(this.props) : character;
    
    let start: React.ReactNode = (
      <li >
        <div
          onClick={disabled ? null : onClick}
          onKeyDown={disabled ? null : onKeyDown}
          role="radio"
        >
          <div className={`${prefixCls}-first`}>{characterNode}</div>
          <div className={`${prefixCls}-second`}>{characterNode}</div>
        </div>
      </li>
    );
    
    if (characterRender) {
      start = characterRender(start as React.ReactElement, this.props);
    }

    return start;
  }
}
