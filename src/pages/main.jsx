import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import ImageCropper from '../components/ImageCropper';
import { ImgCropper } from '../components/ImgCropper';

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  return (
    <div>
      <button onClick={handleOpenModal}>Abrir modal</button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ImageCropper/>
      </Modal>
    </div>
  );
};

const ImageCropperRefForwarded = React.forwardRef((props, ref) => {
  return <ImageCropper {...props} forwardedRef={ref} />;
});

export default Main;