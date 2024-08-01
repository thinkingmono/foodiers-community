'use client'

import { useRef} from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image';

export default function ImagePicker({ label, name, pickedImage, setPickedImage }) {
  // const [pickedImage, setPickedImage] = useState(null);
  const imageInput = useRef();


  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = async () => {
      setPickedImage(fileReader.result);
    }

    fileReader.readAsDataURL(file);

  }

  return <div className={classes.picker}>
    <label htmlFor={name}>{label}</label>
    <div className={classes.controls}>
      <div className={classes.preview}>
        {!pickedImage && <p>No image picked yet</p>}
        {pickedImage && <Image src={pickedImage} alt='The image selected by the user' fill id="picked-image" />}
      </div>
      <input type="file" name={name} id={name} accept='image/png, image/jpeg' className={classes.input} ref={imageInput} onChange={handleImageChange} required />
      <button type="button" className={classes.button} onClick={handlePickClick}>Pick an image</button>
    </div>
  </div>
}