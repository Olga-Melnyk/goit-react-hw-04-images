import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ items }) => {
  return (
    <>
      <Gallery>
        {items.map(item => {
          return <ImageGalleryItem key={item.id} item={item} />;
        })}
      </Gallery>
    </>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
};
