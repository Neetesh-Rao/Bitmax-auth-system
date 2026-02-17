import '../styles/index.css';
import {useNavigate} from 'react-router-dom';

export default function Index(){
    const navigate=useNavigate();
    return(
        <div>
            <h1>Welcome</h1>
            <button onClick={()=>navigate("/signup")}>Signup</button>
            <button onClick={()=>navigate("/login")}>Login</button>
        </div>
    );
}