import React, { useRef, useEffect, useState } from "react";

interface FloodMapProps {
  data: number[][];
}

const FloodMap: React.FC<FloodMapProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [floodHeight, setFloodHeight] = useState<string | null>(null);

  useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0 || data[0].length === 0) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.createImageData(dimensions.width, dimensions.height);

    for (let i = 0; i < dimensions.height; i++) {
      for (let j = 0; j < dimensions.width; j++) {
        const pos = (i * dimensions.width + j) * 4;
        const scaledValue = Math.floor(
          data[Math.floor((i / dimensions.height) * data.length)][
            Math.floor((j / dimensions.width) * data[0].length)
          ] * 255
        );
        imageData.data[pos] = scaledValue;
        imageData.data[pos + 1] = scaledValue;
        imageData.data[pos + 2] = scaledValue;
        imageData.data[pos + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [data, dimensions]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    const x = event.clientX - (rect?.left ?? 0);
    const y = event.clientY - (rect?.top ?? 0);
    const i = Math.floor((y / dimensions.height) * data.length);
    const j = Math.floor((x / dimensions.width) * data[0].length);
    const height = data[i][j];
    setFloodHeight(`Flood height at (${i}, ${j}): ${height.toFixed(2)}`);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        style={{ width: "80vw", display: "block" }}
      ></canvas>
      {floodHeight && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "10px",
          }}
        >
          {floodHeight}
        </div>
      )}
    </div>
  );
};

export default FloodMap;
