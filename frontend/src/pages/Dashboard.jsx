import '../styles/dashboard.css'
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import './Dashboard.css';

export default function(){
    const navigate=useNavigate();
     const [user, setUser] = useState(null);

       useEffect(() => {
    const storedUser = localStorage.getItem("user");
          if (!storedUser || storedUser === "undefined") {
        navigate("/");
        return;
    }
try {
        
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
    } catch (error) {
        console.error("Invalid user data in localStorage");
        localStorage.removeItem("user");
        navigate("/");
    }
}, [navigate]);


    const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      
        navigate('/');
        toast.success("Logout successfully!")
    }

    return(
           <div className="dashboard-container" style={{   background:" linear-gradient(to right, #f58529, #dd2a7b, #8134af)"}}>
        <div className="profile-card" style={{background:"pink"}}>
            
            <div className="profile-header" >
                <div className="profile-avatar">
                    {user?.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 className="profile-username">{user?.username}</h3>
                    <p className="profile-sub">
                        {user?.email 
                            ? user.email 
                            : user?.mobile}
                    </p>
                </div>
            </div>

            <div className="profile-body" style={{color:"black"}}>
                <p ><strong>Username:</strong> {user?.username}</p>
                {user?.email && <p><strong>Email:</strong> {user.email}</p>}
                {user?.mobile && <p><strong>Mobile:</strong> {user.mobile}</p>}
            </div>

            <button onClick={handleLogout} className="logout-btn">
                Logout
            </button>

        </div>
    </div>
        
    )
}