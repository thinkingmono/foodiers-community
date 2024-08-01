'use client';

import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import { useFormState } from 'react-dom';
import { useState } from 'react';

export default function ShareMealPage() {
  const [state, formAction] = useFormState(shareMeal, { message: null });
  const [pickedImage, setPickedImage] = useState(null);

  //Works if the component is not used in client side
  // async function shareMeal(formData) {
  //   'use server';

  //   const meal = {
  //     title: formData.get('title'),
  //     image: formData.get('image'),
  //     summary: formData.get('summary'),
  //     instructions: formData.get('instructions'),
  //     creator: formData.get('name'),
  //     creator_email: formData.get('email')
  //   }

  //   console.log(meal);

  // }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <p>
            <input type="hidden" id="imgPath" name="imgPath" value={pickedImage || ''} readOnly />
          </p>
          <ImagePicker label='Your image' name='image' pickedImage={pickedImage} setPickedImage={setPickedImage} />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}