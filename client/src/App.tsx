import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import io from "socket.io-client";
import './App.css';

function App() {
  const paintCanvas = useRef<HTMLCanvasElement>(null);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [x, setX] = useState<number>(0.0);
  const [y, setY] = useState<number>(0.0);
  const [color, setColor] = useState<string>("#000000");
  const [lineWidth, setLineWidth] = useState<number>(1);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    function sendMsg() {
      socket.emit("message", "HELLO WORLD");
    }

    sendMsg();
  }, []);

  useEffect(() => {
    const current = paintCanvas?.current;

    if (!current) {
      return;
    }

    const context = current.getContext( '2d' );
    if (!context) {
      return;
    }

    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = lineWidth;

    const stopDrawing = () => { setIsMouseDown(false); }
    const startDrawing = (event: MouseEvent) => {
      setIsMouseDown(true);
      setX(event.offsetX);
      setY(event.offsetY);
    }

    const drawLine = (event: MouseEvent) => {
      if (!isMouseDown) {
        return;
      }

      const newX = event.offsetX;
      const newY = event.offsetY;
      context.beginPath();
      context.moveTo( x, y );
      context.lineTo( newX, newY );
      context.stroke();
      setX(newX);
      setY(newY);
    }

    current.addEventListener('mousedown', startDrawing);
    current.addEventListener( 'mousemove', drawLine);
    current.addEventListener( 'mouseup', stopDrawing );
    current.addEventListener( 'mouseout', stopDrawing );

    return () => {
      current.removeEventListener('mousedown', startDrawing);
      current.removeEventListener( 'mousemove', drawLine);
      current.removeEventListener( 'mouseup', stopDrawing);
      current.removeEventListener( 'mouseout', stopDrawing);
    };
  }, [paintCanvas, isMouseDown, x, y, color, lineWidth]);

  const onColorChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  }, []);

  const onRangeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLineWidth(parseInt(event.target.value));
  }, []);

  return (
      <div>
        <input type="color" className="color-picker" onChange={onColorChange} />
        <input type="range" min="1" max="72" value={lineWidth} onChange={onRangeChange} />
        <label>{lineWidth}</label>Px
        <canvas ref={paintCanvas} className="canvas" width="600" height="300" />
      </div>
  );
}

export default App;
