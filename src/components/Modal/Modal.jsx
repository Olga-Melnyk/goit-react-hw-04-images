import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, image }) => {
  const onOverlayClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', keyDown);
    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [onClose]);

  return createPortal(
    <Overlay onClick={onOverlayClose}>
      <ModalContainer>
        <img src={image.largeImageURL} alt="img" />
      </ModalContainer>
    </Overlay>,

    modalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
