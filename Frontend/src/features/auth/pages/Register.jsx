import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth.js'
import { useSelector } from 'react-redux'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState('')

  const [registeredEmail, setRegisteredEmail] = useState('')
  const [showVerifyScreen, setShowVerifyScreen] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState({ type: '', text: '' })
  const [cooldown, setCooldown] = useState(0)

  const { handleRegister, handleResendVerification, handleGoogleLogin } = useAuth()
  const { loading } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)

  // Redirect to home if user is logged in (e.g., after Google sign-in)
  React.useEffect(() => {
    if (user && (user._id || user.id)) {
      navigate('/')
    }
  }, [user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setLocalError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')

    // Validate
    if (!formData.username || !formData.email || !formData.password) {
      setLocalError('Please fill in all fields')
      return
    }

    if (formData.username.length < 3) {
      setLocalError('Username must be at least 3 characters')
      return
    }

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters')
      return
    }

    const result = await handleRegister({
      email: formData.email,
      username: formData.username,
      password: formData.password
    })

    if (result?.success) {
      setRegisteredEmail(formData.email)
      setShowVerifyScreen(true)
      setFormData({ username: '', email: '', password: '' })
    } else {
      setLocalError(result?.message || 'Registration failed. Please try again.')
    }
  }

  const startCooldown = () => {
    setCooldown(60)
    const timer = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const onResendEmail = async () => {
    if (cooldown > 0 || resendLoading) return

    setResendLoading(true)
    setResendMessage({ type: '', text: '' })

    const result = await handleResendVerification({ email: registeredEmail })

    if (result?.success) {
      setResendMessage({ type: 'success', text: result.message })
      startCooldown()
    } else {
      setResendMessage({ type: 'error', text: result?.message || 'Failed to resend email' })
    }

    setResendLoading(false)
  }

  // ========== Email Verification Screen ==========
  if (showVerifyScreen) {
    return (
      <div className="auth-page">
        <div className="auth-card verify-card">
          {/* Logo */}
          <div className="auth-logo">
            <img src="/perplexity-logo.png" alt="Perplexity" />
            <span className="auth-logo-text">Perplexity</span>
          </div>

          {/* Email Icon */}
          <div className="verify-icon-wrapper">
            <svg className="verify-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>

          {/* Content */}
          <h2 className="verify-title">Check your email</h2>
          <p className="verify-description">
            We've sent a verification link to
          </p>
          <p className="verify-description">
            <span className="verify-email-highlight">{registeredEmail}</span>
          </p>
          <p className="verify-description" style={{ marginTop: '4px', fontSize: '0.84rem' }}>
            Click the link in the email to verify your account. Check your spam folder if you don't see it.
          </p>

          <div className="verify-divider"></div>

          {/* Resend Section */}
          <div className="verify-resend-section">
            <p className="verify-resend-text">Didn't receive the email?</p>

            {/* Resend Messages */}
            {resendMessage.text && (
              <div className={`alert alert-${resendMessage.type}`} style={{ marginBottom: '16px', textAlign: 'left' }}>
                <svg className="alert-icon" viewBox="0 0 20 20" fill="currentColor">
                  {resendMessage.type === 'success' ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  )}
                </svg>
                <span className="alert-content">{resendMessage.text}</span>
              </div>
            )}

            <button
              onClick={onResendEmail}
              disabled={cooldown > 0 || resendLoading}
              className="btn-resend"
            >
              {resendLoading ? (
                <>
                  <span className="spinner" style={{ width: '14px', height: '14px', borderWidth: '1.5px' }}></span>
                  Sending...
                </>
              ) : (
                <>
                  <svg className="btn-resend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10" />
                    <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
                  </svg>
                  Resend verification email
                </>
              )}
            </button>

            {cooldown > 0 && (
              <span className="resend-cooldown">
                You can resend in {cooldown}s
              </span>
            )}
          </div>

          {/* Back to Login */}
          <p className="verify-login-link">
            Already verified? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    )
  }

  // ========== Registration Form ==========
  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <img src="/perplexity-logo.png" alt="Perplexity" />
          <span className="auth-logo-text">Perplexity</span>
        </div>

        {/* Title */}
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Start exploring with Perplexity AI</p>

        {/* Error Alert */}
        {localError && (
          <div className="alert alert-error">
            <svg className="alert-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="alert-content">{localError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Username */}
          <div className="form-group">
            <label htmlFor="reg-username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="reg-username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className="form-input"
              autoComplete="username"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="reg-email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="reg-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="form-input"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="reg-password" className="form-label">
              Password
            </label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="reg-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                className="form-input"
                autoComplete="new-password"
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
                Creating account...
              </span>
            ) : (
              'Create Account'
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
          Sign up with Google
        </button>

        {/* Footer */}
        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
