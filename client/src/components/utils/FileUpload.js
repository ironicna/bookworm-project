import React from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';
function FileUpload(props) {

    const [Images, setImages] = React.useState([])

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0])

        // save image inside Node server
        Axios.post('/api/book/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])
                } else {
                    alert('Failed to save the Image in Server')
                }
             })
    }
    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{ display:'flex', justifyContent: 'space-between' }}>
            <Dropzone
              onDrop={onDrop}
              multiple={false}
              maxSize={900000000}  
            >
                {({getRootProps, getInputProps}) => (
                    <div style={{ width:'300px', height:'350px', border:'1px solid lightgray', display:'flex', alignItems:'center', justifyContent:'center'}}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize:'3rem'}} />
                    </div>
                )}
            </Dropzone>
            
                    <div style={{ display:'flex', width:'250px', height:'360px', overflowX: 'scroll' }}>
                        {Images.map((image, index) => (
                            <div onClick={() => onDelete(image)}>
                                <img style={{ minWidth: '250px', width: '250px', height: '350px' }} src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
                            </div>
                        ))}    
                    </div>
        </div>
    )
}

export default FileUpload
