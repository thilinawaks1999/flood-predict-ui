import React, { useRef, useEffect, useState } from "react";

interface FloodMapProps {
  data: number[][]; // The data array should contain values between 0 and 1
}

const FloodMap: React.FC<FloodMapProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [floodHeight, setFloodHeight] = useState<string | null>(null);

  // Handle window resize
  useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update canvas whenever data or dimensions change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0 || data[0].length === 0) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.createImageData(dimensions.width, dimensions.height);

    // Apply color mapping based on data
    for (let i = 0; i < dimensions.height; i++) {
      for (let j = 0; j < dimensions.width; j++) {
        const dataIndexY = Math.floor((i / dimensions.height) * data.length);
        const dataIndexX = Math.floor((j / dimensions.width) * data[0].length);
        const height = data[dataIndexY][dataIndexX];
        const [r, g, b] = getColorForHeight(height);

        const pos = (i * dimensions.width + j) * 4;
        imageData.data[pos] = r;
        imageData.data[pos + 1] = g;
        imageData.data[pos + 2] = b;
        imageData.data[pos + 3] = 255; // Fully opaque
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [data, dimensions]);

  // Mouse move handler to display flood height
  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    const x = event.clientX - (rect?.left ?? 0);
    const y = event.clientY - (rect?.top ?? 0);
    if (!rect) return;
    const dataIndexY = Math.floor((y / rect.height) * data.length);
    const dataIndexX = Math.floor((x / rect.width) * data[0].length);

    if (
      dataIndexY >= 0 &&
      dataIndexY < data.length &&
      dataIndexX >= 0 &&
      dataIndexX < data[0].length
    ) {
      const height = data[dataIndexY][dataIndexX];
      setFloodHeight(
        `Flood height at (${dataIndexY}, ${dataIndexX}): ${height.toFixed(2)} m`
      );
    }
  };

  // Color mapping function
  const getColorForHeight = (height: number): [number, number, number] => {
    if (height < 0.2) return [24, 77, 71]; // Deep water
    else if (height < 0.4) return [54, 117, 136]; // Shallow water
    else if (height < 0.6) return [96, 185, 154]; // Near shore
    else return [220, 217, 57]; // Land
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
