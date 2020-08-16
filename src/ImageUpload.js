import React, {useState} from 'react'
import { Button } from '@material-ui/core'
import firebase from "firebase"
import { db,storage } from './firebase'
import './ImageUpload.css'

function ImageUpload({username}) {

    const[caption, setCaption]=useState('')
    const[image, setImage]=useState(null)
    const[progress, setProgress]=useState(0)

    const handleChange=(e)=>{
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
    }



    const handleUpload =()=>{
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",(snapshot)=>{
                    const progress= Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
                setProgress(progress)
                },(error)=>{
                    alert(error.message)
                },()=>{
                    storage.ref("images").child(image.name).getDownloadURL().then(url=>{
                        db.collection("posts").add({
                            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                            caption:caption,
                            imageUrl:url,
                            username:username
            
                        })

                        setProgress(0);
                        setCaption('');
                        setImage(null);

                    });
                }
            )
    }
    return (
        <div className="imageupload">
          <h4>Share to the World!</h4>
          <progress className="imageUploadprogress" value={progress} max="100"/>
          <input type="text" placeholder="Enter a Caption.." value={caption} onChange={event=>setCaption(event.target.value)}/>
          <input type="file" onChange={handleChange} />
          <Button onClick={handleUpload}>Upload</Button>

        </div>
    )
}

export default ImageUpload
