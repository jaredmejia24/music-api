import { initializeApp } from "firebase/app";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

import { Request } from "express";

import * as dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Storage service
const storage = getStorage(firebaseApp);

export const uploadImg = async (param: {
  req: Request;
  title: string;
  modelName: string;
}) => {
  if (!param.req.file) {
    const filename = "typescript/default/default-img.jpg";
    const imgRef = ref(storage, filename);
    const imgUrl = await getDownloadURL(imgRef);

    return imgUrl;
  }

  // Create firebase reference
  const [originalName, ext] = param.req.file.originalname.split("."); // -> [pug, jpg]

  const filename = `typescript/${process.env.NODE_ENV}/${param.modelName}/${
    param.title
  }/${originalName}-${Date.now()}.${ext}`;
  const imgRef = ref(storage, filename);

  // Upload image to Firebase
  await uploadBytes(imgRef, param.req.file.buffer);

  const imgUrl = await getDownloadURL(imgRef);

  return imgUrl;
};
