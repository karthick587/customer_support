import { useState } from "react"
export default function Test() {
    const [images, setImages] = useState('');
    const addimage = () => {
        console.log(images)
        Axios.post(`https://localhost/api/team/new`, {
            images: images
        }).then((response) => {
            console.log(response);
        });
    }
    return (
        <div>
            <form  method="post">
                <input type="file" name="images" accept='image/*' onChange={(e) => { setImages(e.target.value); }} />
                <button type="submit" onClick={addimage}>button</button>
            </form>
        </div>
    )
}
