import React from 'react';
import { createRoot } from 'react-dom/client';
import '../assets/tailwind.css';

function Popup() {
  return (
    <div>
      <img src="images/niki-side.jpg" alt="" />
      <p className="text-xl">NIKI Guard 1.0</p>
    </div>
  );
}

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);

root.render(<Popup />);
