import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth.js'
import { useSelector } from 'react-redux'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState('')
  const [localSuccess, setLocalSuccess] = useState('')

  const { handleLogin, handleGoogleLogin } = useAuth()
  const navigate = useNavigate()
  const { user, error, loading } = useSelector(state => state.auth)

  useEffect(() => {
    if (!loading && user && user._id) {
      navigate('/')
    }
  }, [user, loading, navigate])

  useEffect(() => {
    if (error) {
      setLocalError(error)
      setLocalSuccess('')
    }
  }, [error])

  const submitForm = async (event) => {
    event.preventDefault()
    
    if (!email || !password) {
      setLocalError('Email and password are required')
      return
    }

    setLocalError('')
    setLocalSuccess('')

    await handleLogin({ email, password })
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <img src="/perplexity-logo.png" alt="Perplexity" />
          <span className="auth-logo-text">Perplexity</span>
        </div>

        {/* Title */}
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to continue your journey</p>

        {/* Error Alert */}
        {localError && (
          <div className="alert alert-error">
            <svg className="alert-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="alert-content">{localError}</span>
          </div>
        )}

        {/* Success Alert */}
        {localSuccess && (
          <div className="alert alert-success">
            <svg className="alert-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="alert-content">{localSuccess}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitForm} className="auth-form">
          {/* Email */}
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="login-email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setLocalError('')
              }}
              placeholder="you@example.com"
              className="form-input"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setLocalError('')
                }}
                placeholder="Enter your password"
                className="form-input"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            <div style={{ textAlign: 'right', marginTop: '4px' }}>
              <Link to="/forgot-password" style={{ fontSize: '0.82rem', color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 500 }}>
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <span className="btn-loading">
                <span className="spinner"></span>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Separator */}
        <div className="auth-separator">or</div>

        {/* Google Auth Button */}
        <button type="button" className="btn-google" onClick={handleGoogleLogin}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <g>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </g>
          </svg>
          Sign in with Google
        </button>

        {/* Footer */}
        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  )
}

export default Login