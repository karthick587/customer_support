import React, { useContext,useState,useEffect } from "react";
import Imageviewer from '../common/imageviewer'
import Axios from "axios";
export default function ViewScreenshots(props){
    const { FileArray }=props
//   console.log(FileArray)
    const [newarray,setnewarray]=useState([]);
    const[mimetype,setMimetype] = useState('');
    useEffect(()=>{
       var TeamList = [...newarray]
       if(FileArray !== undefined){
        FileArray.map((product)=>{
            TeamList.push(product.Filepath)
        })
        setnewarray(TeamList)
       } 
       if(FileArray !== undefined){
           FileArray.map((files)=>{
            setMimetype(files.Filepath.slice(files.Filepath.length - 4));
           })
       } 
    },[setnewarray,FileArray])
    
    return(
        <div className="">
            {newarray.map((screenshots)=>
                 <div key={screenshots}>
                     {mimetype === ".png" || mimetype === ".jpg" || mimetype === "jpeg" ?
                 <Imageviewer
                     imgdialogbutton={<img src={screenshots}  alt="screenshots" width={200} height={100} />}
                     imgdialogbody={<img className='screeshot-img-viewer' src={screenshots} alt="screenshots" />}
                 /> : 
                 <a href={screenshots} target="_blank" rel="noreferrer noopener">View File</a>
            }
            </div>
            )}
     </div>
    )
}