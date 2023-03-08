import { useState } from 'react';
import { fetchGalleryImageWithQuer } from '../services/getGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

let page = 1;

export const App = () => {
  const [text, setText] = useState('');
  // const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [isMore, setIsMore] = useState(false);
  // const [isNewSearch, setIsNewSearch] = useState(false);
  const [images, setImages] = useState([]);

  const handleSubmit = async textSearch => {
    page = 1;
    setIsMore(false);
    if (textSearch.trim() === text) {
      return;
    }
    // if (isNewSearch) {
    //   setImages([]);
    // }
    try {
      setImages([]);
      setIsLoading(true);
      const data = await fetchGalleryImageWithQuer(textSearch.trim(), page);
      if (data.hits.length === 0) {
        setStatus('idle');
        setIsLoading(false);
        setIsMore(false);
        setText('');
        return toast.error('Sorry, there are no images. Please try again.');
      }
      setImages([...data.hits]);
      setStatus('resolved');
      setIsLoading(false);
      setText(textSearch);
      if (data.hits.length === 12) {
        setIsMore(true);
      }
      // if (textSearch !== text) {
      //   setIsNewSearch(true);
      // }
    } catch (error) {
      setStatus('rejected');
    }
  };

  const handleClick = async () => {
    try {
      setIsLoading(true);
      // setPage(page + 1);
      const data = await fetchGalleryImageWithQuer(text, page + 1);
      setImages([...images, ...data.hits]);
      setStatus('resolved');
      setIsLoading(false);
    } catch (error) {
      setStatus('rejected');
    }
  };

  return (
    <div>
      <div>
        <SearchBar onSearch={handleSubmit} />
      </div>
      {isLoading && <Loader />}
      <div>
        {status === 'resolved' && <ImageGallery items={images} />}
        {isMore && <Button onSearch={handleClick}>Load more</Button>}
        {status === 'rejected' && <p>Something wrong, try later</p>}
      </div>
      <Toaster toastOptions={{ duration: 1500 }} />
    </div>
  );
};
