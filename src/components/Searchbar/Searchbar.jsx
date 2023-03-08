import { useState } from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

import { BsSearch } from 'react-icons/bs';

import {
  Searchbar,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';

export const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      return toast.error('Please write a word to search for');
    }
    onSearch(value);
    setValue('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <BsSearch />
        </SearchButton>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </SearchForm>
    </Searchbar>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
