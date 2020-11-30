import React from 'react';

const segmentMap = [
  { a: true, b: true, c: true, d: true, e: true, f: true, g: false },
  { a: false, b: true, c: true, d: false, e: false, f: false, g: false },
  { a: true, b: true, c: false, d: true, e: true, f: false, g: true },
  { a: true, b: true, c: true, d: true, e: false, f: false, g: true },
  { a: false, b: true, c: true, d: false, e: false, f: true, g: true },
  { a: true, b: false, c: true, d: true, e: false, f: true, g: true },
  { a: true, b: false, c: true, d: true, e: true, f: true, g: true },
  { a: true, b: true, c: true, d: false, e: false, f: false, g: false },
  { a: true, b: true, c: true, d: true, e: true, f: true, g: true },
  { a: true, b: true, c: true, d: true, e: false, f: true, g: true }
];

export default function SevenSegmentDisplay({ width, height, onColor, offColor, value, style = {} }) {
  width = +width;
  height = +height;
  value = +value;

  if (value < 0 || value > 9) {
    throw new Error('react-seven-segment-display: "value" prop must be between 0-9');
  }

  const { a, b, c, d, e, f, g } = segmentMap[value];

  style.display = 'inline-block';
  style.width = `${width + (height * 2)}px`;

  return (
    <div style={style}>
      <HSegment width={width} height={height} color={a ? onColor : offColor} />
      <div style={{ position: 'relative', width: '100%', height: `${width}px` }}>
        <VSegment width={height} height={width} color={f ? onColor : offColor} align="left" />
        <VSegment width={height} height={width} color={b ? onColor : offColor} align="right" />
      </div>
      <HSegment width={width} height={height} color={g ? onColor : offColor} />
      <div style={{ position: 'relative', width: '100%', height: `${width}px` }}>
        <VSegment width={height} height={width} color={e ? onColor : offColor} align="left" />
        <VSegment width={height} height={width} color={c ? onColor : offColor} align="right" />
      </div>
      <HSegment width={width} height={height} color={d ? onColor : offColor} />
    </div>
  )
}

SevenSegmentDisplay.defaultProps = {
  width: 40,
  height: 5,
  value: 0,
  onColor: 'rgba(255,0,0,1)',
  offColor: 'transparent'
};

export  function HSegment({ width, height, color }) {
  const style = {
    position: 'relative',
    margin: '0 auto',
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color
  };

  return (
    <div style={style}>
      <Arrow size={height} color={color} direction="left" />
      <Arrow size={height} color={color} direction="right" />
    </div>
  )
}
export  function VSegment({ width, height, color, align }) {
  const style = {
    position: 'absolute',
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color
  };

  if (align === 'left') {
    style.left = '0px';
  } else {
    style.right = '0px';
  }

  return (
    <div style={style}>
      <Arrow size={width} color={color} direction="top" />
      <Arrow size={width} color={color} direction="bottom" />
    </div>
  )
}
const INVERSE_DIRECTION = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top'
};

const BORDER_COLOR_PROP = {
  left: 'borderLeftColor',
  right: 'borderRightColor',
  top: 'borderTopColor',
  bottom: 'borderBottomColor'
};

export const Arrow = ({ size, color, direction }) => {
  const style = {
    position: 'absolute',
    width: '0px',
    height: '0px',
    borderColor: 'transparent',
    borderWidth: `${size * 0.5}px`,
    borderStyle: 'solid'
  };

  const direction_inv = INVERSE_DIRECTION[direction];

  style[BORDER_COLOR_PROP[direction_inv]] = color;
  style[direction_inv] = '100%';

  return <div style={style} />
}
