import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const upload = async (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
  
  try {
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        }, 
        (error) => {
          console.error("Upload Error:", error);
          reject(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          }).catch((error) => {
            console.error("Error getting download URL:", error);
            reject(error);
          });
        }
      );
    });
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
}

export default upload;
