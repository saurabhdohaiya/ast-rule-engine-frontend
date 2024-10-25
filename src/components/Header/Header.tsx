import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss'; 

const Header: React.FC = () => {
    const navigate = useNavigate(); 

    const navigateToHome = () => {
        navigate('/create-rule'); 
    };

    return (
        <header className="header">
            <div className="header-content">
                <h1 className="project-name" onClick={navigateToHome}>Logictree</h1>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/create-rule">Create Rule</Link></li>
                        <li><Link to="/combine-rules">Combine Rules</Link></li>
                        <li><Link to="/evaluate-rule">Evaluate Rule</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
