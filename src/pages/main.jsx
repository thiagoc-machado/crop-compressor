import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import ImageCropper from '../components/ImageCropper';

const Main = () => {
const [isModalOpen, setIsModalOpen] = useState(false);

function handleOpenModal() {
setIsModalOpen(true);
}

function handleCloseModal() {
setIsModalOpen(false);
}

return (
<div>
<button onClick={handleOpenModal}>Abrir modal</button>
<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
<ImageCropper onCloseModal={handleCloseModal} />
</Modal>
</div>
);
};

const ImageCropperRefForwarded = React.forwardRef((props, ref) => {
return <ImageCropper {...props} forwardedRef={ref} />;
});

export default Main;