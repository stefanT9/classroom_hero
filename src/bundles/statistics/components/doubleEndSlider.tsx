import React from "react";

interface DoubleEndSlider {
  left: number;
  right: number;
  min: number;
  max: number;
  setLeft: (event: any) => void;
  setRight: (event: any) => void;
}
export const DoubleEndSlider = (props: DoubleEndSlider) => {
  const { left, right, min, max, setLeft, setRight } = props;
  console.log(props);
  return (
    <div>
      <input
        step={1}
        value={left}
        onChange={(event) => {
          if (Number(event.target.value) < right) setLeft(event);
        }}
        min={min}
        max={max}
        type="range"
      />
      <input
        step={1}
        value={right}
        onChange={(event) => {
          if (Number(event.target.value) > left) setRight(event);
        }}
        min={min}
        max={max}
        type="range"
      />
    </div>
  );
};
