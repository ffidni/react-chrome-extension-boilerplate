import React from 'react';
import { createRoot } from 'react-dom/client';
import '../assets/tailwind.css';

function Popup() {
  return (
    <div>
      <p className="text-xl">ReactJS Chrome Extension Boilerplate</p>
    </div>
  );
}

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);

root.render(<Popup />);
