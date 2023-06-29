// React
import { useEffect, useRef, useState } from 'react';
import React from 'react';

// Utils
import { animated } from '@react-spring/three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import {
  OrthographicCamera,
  OrbitControls,
  TransformControls,
} from '@react-three/drei';
import { Canvas, useLoader, extend } from '@react-three/fiber';
import create from 'zustand';

// Assets
import hellofont from '../../images/hellofont.json';

// styles
import './index.scss';

const useStore = create((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
}));

const useCamera = create((set) => ({
  position: [1000, 800, 1000],
  setPosition: (position) => set({ position }),
}));
extend({ TextGeometry });

const ImageItem = ({ item, handleDelete }) => {
  const setTarget = useStore((state) => state.setTarget);
  const colorMap = useLoader(TextureLoader, item.url);

  return (
    <animated.mesh
      position={item.position}
      scale={item.scale}
      rotation={item.rotation}
      canvasItemId={item.canvasItemId}
      onClick={(e) => {
        setTarget(e.object);
      }}
      onDoubleClick={() => {
        setTarget(null);
        handleDelete(item.canvasItemId);
      }}
    >
      <boxGeometry />
      <meshStandardMaterial attach="material" map={colorMap} />
    </animated.mesh>
  );
};

const DashboardGarageCanvas = ({
  garageName,
  action,
  items,
  handleMove,
  handleDelete,
}) => {
  const group = useRef();
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const { target, setTarget } = useStore();

  const { position } = useCamera();
  const font = new FontLoader().parse(hellofont);

  useEffect(() => {
    const updateDimension = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', updateDimension);

    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [height, width]);

  return (
    <div id="garage__canvas">
      <Canvas
        style={{
          background: '#cfcdcd29',
          height: `${height}px`,
          width: `${width}px`,
        }}
        shadows
        dpr={[1, 2]}
        onPointerMissed={(e) => {
          setTarget(null);
        }}
      >
        <group ref={group}>
          <ambientLight intensity={0.2} />
          <directionalLight />
          <gridHelper args={[100, 100]} position={[0, -40, 0]} />
          {items.map((item, index) => (
            <ImageItem
              item={item}
              key={index}
              handleMove={handleMove}
              handleDelete={handleDelete}
            ></ImageItem>
          ))}
          {target !== null && target != undefined && (
            <TransformControls object={target} mode={action} />
          )}

          <OrbitControls makeDefault />
          <OrthographicCamera makeDefault zoom={2} position={position} />
        </group>
      </Canvas>
    </div>
  );
};
export default DashboardGarageCanvas;
