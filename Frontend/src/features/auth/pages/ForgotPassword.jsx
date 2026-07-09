import React, { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hook/useAuth.js'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [localError, setLocalError] = useState('')
  const [localSuccess, setLocalSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const { handleForgotPassword } = useAuth()

  const submitForm = async (event) => {
    event.preventDefault()

    if (!email) {
      setLocalError('Email is required')
      return
    }

    setLocalError('')
    setLocalSuccess('')
    setLoading(true)

    const result = await handleForgotPassword({ email })

    if (result.success) {
      setLocalSuccess(result.message)
      setEmail('')
    } else {
      setLocalError(result.message)
    }

    setLoading(false)
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
        <h1 className="auth-title">Forgot your password?</h1>
        <p className="auth-subtitle">
          Enter your email address and we'll send you a link to reset your password.
        </p>

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
            <label htmlFor="forgot-email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="forgot-email"
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <span className="btn-loading">
                <span className="spinner"></span>
                Sending...
              </span>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="auth-footer">
          Remember your password?{' '}
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
