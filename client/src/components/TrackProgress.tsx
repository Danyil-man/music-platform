import React from "react";

interface TrackProgressProps {
  left: number;
  right: number;
  label: string;
  onChange: (e: any) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({
  left,
  right,
  label,
  onChange,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <input
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      <div>
          {/* {label === "track"
            ? `${
                (left / 60) * 60 < 60
                  ? `${(left / 60) * 60} seconds`
                  : `${Math.floor(left / 60)} minutes ${(left / 60) * 60 - 60} seconds`
              } / ${Math.ceil(right / 60)} minutes`
            : ` ${left} / ${right}`} */}
          {left} / {right}
      </div>
    </div>
  );
};

export default TrackProgress;
