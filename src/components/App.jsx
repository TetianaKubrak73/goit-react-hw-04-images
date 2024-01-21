import React, { useState, useEffect } from 'react';
import PostsApiService from '../Api/PostApiService';
import Notiflix from 'notiflix';
import style from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';

const postApiService = new PostsApiService();

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [error, setError] = useState(true);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      setLoading(true);
      setError(false);

      postApiService.query = searchQuery;
      postApiService.page = galleryPage;

      try {
        const data = await postApiService.fetchPost();
        postApiService.hits = data.totalHits;

        const newData = data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        const currentData = [...galleryItems, ...newData];

        setGalleryItems(prevGalleryItems => [...prevGalleryItems, ...newData]);

        if (!data.totalHits) {
          setLoading(false);
          setError(true);
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        if (currentData.length >= data.totalHits) {
          setLoading(false);
          setIsButtonShow(false);
          setError(false);
          return;
        }

        if (galleryPage === 1) {
          Notiflix.Notify.success(
            `Hooray! We found ${postApiService.hits} images.`
          );
        }

        setLoading(false);
        setIsButtonShow(true);
        setError(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        setError(true);
        Notiflix.Notify.failure(
          'An error occurred while fetching data. Please try again.'
        );
      }
    };

    if (searchQuery || galleryPage > 1) {
      fetchGalleryItems();
    }
  }, [searchQuery, galleryPage, galleryItems]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setGalleryPage(1);
    setGalleryItems([]);
    setIsButtonShow(false);
  };

  const onLoadMore = () => {
    setGalleryPage(prevPage => prevPage + 1);
  };

  return (
    <div className={style.App}>
      <Searchbar onSubmit={handleFormSubmit} />

      {error && <h2>Please, enter search word!</h2>}
      {!error && <ImageGallery galleryItems={galleryItems} />}
      {loading && <Loader />}
      {isButtonShow && <Button onClick={onLoadMore} />}
    </div>
  );
};

export default App;
