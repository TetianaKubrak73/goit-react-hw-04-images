import React, { useState } from 'react';
import Notiflix from 'notiflix';
import style from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = ({ currentTarget: { value } }) => {
    setSearchQuery(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === '') {
      Notiflix.Notify.info('Please, enter search word!');
      return;
    }

    onSubmit(trimmedQuery);
    setSearchQuery('');
  };

  return (
    <header className={style.searchBar}>
      <form className={style.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={style.searchFormButton}>
          <span className={style.searchFormButtonLabel}>Search</span>
        </button>
        <input
          className={style.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchQuery"
          value={searchQuery}
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
