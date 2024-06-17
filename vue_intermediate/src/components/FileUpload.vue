<template>
  <div style="border-style: solid">
    <input type="file" @change="(e)=>getFile(e)" />
    <button @click="submitFile">Upload!</button>
    <div v-if="progress !== null">Upload Progress: {{ progress }}%</div>
    <div v-if="!isPic">
      {{ preview }}
    </div>
    
    <div v-else>
      <img :src="preview" style="width: 75%" />
    </div>

    <button @click="deleteFile">Delete</button>




    <div>
    <button @click="listFiles">List Files</button>
    <ul v-if="fileList.length">
      <li v-for="file in fileList" :key="file.name">{{ file.name }}</li>
    </ul>
  </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject, listAll } from 'firebase/storage'
// uploadBytes
import { useAuthStore } from '@/piniastore/auth';
import { storage } from '@/firebase';
const auth= useAuthStore()
const File = ref(null)
const preview = ref(null)
const isPic = ref(false)
const progress= ref(null);
const fileRef= ref(null);
const fileList = ref([]);
const getFile = (event) => {
  console.log(event.target)
  File.value = event.target.files[0]
  preview.value = null
  isPic.value = false
  if (File.value.name.includes('.png') || File.value.name.includes('.jpg')) {
    isPic.value = true
  }
}

const submitFile = async () => {
  if (!File.value) return

  const storage = getStorage()
  const filePath = `uploads/${auth.user.uid}/${File.value.name}`;
  fileRef.value = storageRef(storage, filePath)


    // Upload file to Firebase Storage
    const metadata = {
  contentType: 'image/jpeg',
};


  const uploadTask=  uploadBytesResumable(fileRef.value, File.value, metadata);

  uploadTask.on('state_changed',
    (snapshot) => {
      progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   console.log(snapshot.state);
      switch (snapshot.state) {
      

      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
    },
    (error) => {
      console.error('Error uploading file:', error);
      switch (error.code) {
      case 'storage/unauthorized':
        console.log("User doesn't have permission to access the object")
        break;
      case 'storage/canceled':
        console.log("User canceled the upload");
        break;

      // ...

      case 'storage/unknown':
        console.log("Unknown error occurred, inspect error.serverResponse");
        break;
    }
    },
    async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      preview.value = url;
      progress.value = null; // Reset progress after completion
    }
  );

    // // Get download URL of the uploaded file
    // const url = await getDownloadURL(fileRef)
    // preview.value = url


    
}

const deleteFile = async () => {
  if (!fileRef.value) return;

  try {
    await deleteObject(fileRef.value);
    preview.value = null;
    File.value = null;
    console.log('File deleted successfully');
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}

const listFiles = async () => {
  try {
   
    const listRef = storageRef(storage, `uploads/${auth.user.uid}/`);
    const res = await listAll(listRef);

    fileList.value = res.items.map(itemRef => {
      return { name: itemRef.name, fullPath: itemRef.fullPath };
    });
  } catch (error) {
    console.error('Error listing files:', error);
  }
}
</script>
