import { nanoid } from 'nanoid';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';
const ImageGallery = ({ galleryItems }) => {
  return (
    <ul className={style.imageGallery}>
      {galleryItems.map(galleryItem => {
        return <ImageGalleryItem key={nanoid()} galleryItem={galleryItem} />;
      })}
    </ul>
  );
};

export default ImageGallery;
