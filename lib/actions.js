'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

function isInvalidText(text) {
  return !text || text.trim().length === 0;
}

//Upload image to cloudinary
export async function uploadImage(imgPath) {
  try {
    const result = await cloudinary.uploader.upload(imgPath, {
      use_filename: true,
      folder: 'file-upload-app'
    })
    return { data: result.secure_url }
  } catch (error) {
    console.log(error);
    throw new Error('There was an error...');
  }
}

export async function shareMeal(prevState, formData) {

  const meal = {
    title: formData.get('title'),
    image: formData.get('image'),
    imgPath: formData.get('imgPath'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    creator: formData.get('name'),
    creator_email: formData.get('email')
  }

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image || meal.image.size === 0 || !meal.imgPath
  ) {
    return { message: 'Invalid input' }
  }

  try {
    const { data } = await uploadImage(meal.imgPath);
    if (!data) {
      throw new Error('There was an error uploading the image. Please try again later.')
    }
    meal.image = data;
  } catch (error) {
    console.log(`There was an error loading your file. ${error.message}`)
  }

  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals');
}