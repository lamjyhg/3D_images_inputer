import { Modal } from '@mui/material';
import React from 'react';

import './style.scss';
export default function CanvasIntroductionModal({ open, setOpen }) {
  return (
    <Modal open={open} disableAutoFocus={true}>
      <div className="canvasIntroductionModal">
        <form></form>
      </div>
    </Modal>
  );
}
