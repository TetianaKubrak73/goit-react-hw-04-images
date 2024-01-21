import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ galleryItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
  };

  const { webformatURL, largeImageURL, tags } = galleryItem;

  return (
    <>
      <li className={style.imageGalleryItem} onClick={toggleModal}>
        <img
          className={style.imageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
      </li>
      {isModalOpen && (
        <Modal
          largeImageURL={largeImageURL}
          alt={tags}
          onCloseModal={toggleModal}
        />
      )}
    </>
  );
};

export default ImageGalleryItem;
