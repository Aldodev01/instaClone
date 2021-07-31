import { Button } from "@material-ui/core";
import { useState } from "react";
import { storage, db } from "./firebase";
import './ImageUpload.css'
import InstagramEmbed from 'react-instagram-embed'
import firebase from './firebase'


function ImageUpload({username}) {
    const [caption, setCaption] = useState(null)
    const [image, setImage] = useState(0)
    const [progress, setProgress] = useState('')

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => { 
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Progres function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100  
                )
                setProgress(progress)
            },
            (error) =>{
                // error function
                alert(error.massage)
            },
            () => {
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    // post image inside db
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption:  caption,
                        imageUrl: url,
                        username: username
                    })

                    setProgress(0)
                    setCaption(" ")
                    setImage(null) 
                })
            }
        )
    }

    return(
        <div className="imageUpload">
            <h1>Upload here</h1>

            <progress className='imageUploadProgress' value={progress} max='100'/>
            <input type="text" onChange={event => setCaption(event.target.value)} placeholder='Enter a Caption...' value={caption}/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload