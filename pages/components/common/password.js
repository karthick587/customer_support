import { useState } from "react"
import { Button } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
export default function PasswordViewer(props) {
    const [show5, setshow5] = useState(false)
    return (
        <div className="flex">
            <input className='password-input5' value={props.Password} type={show5 === true ? "text" : "password"} />
            <Button onClick={() => setshow5(!show5)}>{!show5 ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}</Button>
        </div>
    )
}