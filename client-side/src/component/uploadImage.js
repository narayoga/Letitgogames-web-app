import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticatedAction } from "../redux/actions/authenticated";
import './component.css';

function Upload() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState('')
    const { data } = useSelector((state) => state.authenticatedReducer);

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0])
        data.append('upload_preset', 'letitimages')
        setLoading(true)

        const res = await fetch("https://api.cloudinary.com/v1_1/alternate-cloud/image/upload",
        {
            method:"POST",
            body:data
        })

        const file = await res.json()
        console.log(file)
        setImage(file.secure_url)
        setLoading(false)

        localStorage.setItem('src', file.secure_url)
    }

    useEffect(() => {
        console.log('masuk useEffect upload')
        dispatch(authenticatedAction());
        setImage(data.src)
      }, []);

    return (
        <div data-testid="upload">
            <div>
                <img data-testid={'image'} className="upload-image" alt="gambar" src={image} />
            </div>
            {loading &&<div><p>loading...</p></div>}
            {!loading &&
                <div className="inputTag">
                    <label htmlFor="inputTag">
                    upload img
                        <input
                            id="inputTag"
                            type="file"
                            name="file"
                            onChange={uploadImage}
                        />
                    </label>
                </div>
            }
        </div>
    )
}

export default Upload;