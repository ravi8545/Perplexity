import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router';

const Protected = ({children}) => {
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);
    
    if(loading) {
        return (
            <div className="app-loader">
                <div className="app-loader__content">
                    {/* Outer glow ring */}
                    <div className="app-loader__glow"></div>
                    {/* Spinner rings */}
                    <div className="app-loader__spinner">
                        <div className="app-loader__ring app-loader__ring--outer"></div>
                        <div className="app-loader__ring app-loader__ring--inner"></div>
                    </div>
                    {/* Logo */}
                    <div className="app-loader__logo">
                        <img src="/perplexity-logo.png" alt="Perplexity" />
                    </div>
                </div>
                <p className="app-loader__text">Loading</p>
                <div className="app-loader__dots">
                    <span className="app-loader__dot"></span>
                    <span className="app-loader__dot"></span>
                    <span className="app-loader__dot"></span>
                </div>
            </div>
        )
    }
    if(!user) {
        return <Navigate to="/login" replace />
    }

  return children;
}

export default Protected