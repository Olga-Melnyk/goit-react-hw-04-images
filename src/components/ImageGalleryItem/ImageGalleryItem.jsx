import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

import { ImageItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item }) => {
  const [shownModal, setShownModal] = useState(false);

  const onModal = () => {
    setShownModal(shownModal => !shownModal);
  };

  return (
    <ImageItem>
      <Image onClick={onModal} src={item.webformatURL} alt="img" />
      {shownModal && <Modal onClose={onModal} image={item} />}
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
