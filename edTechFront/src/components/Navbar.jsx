import { Link, useNavigate } from "react-router-dom";

function Navbar(){
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/login');
    };
    return(
        <nav style={{padding: '1rem', background: '#f0f0f0'}}>
            {/* Left hand logo */}
        <div>
            <Link to={"/"} >Nav</Link>
        </div>
        {/* Righ hand nav items */}
        <div>
            <ul>
                {token && (
                    <li>
                        <Link to={"courses"}>My Courses</Link>
                    </li>
                )}
                {/* if not authed */}

                {!token ?(
                    <li>
                        <Link to={"/login"}>Login</Link>
                    </li>
                ):(
                    <li>
                        <button onClick={handleLogout}><Link>Logout</Link></button>
                    </li>
                )}
            </ul>
        </div>
        </nav>
    )
}

export default Navbar;