import React, { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth.js'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [localError, setLocalError] = useState('')
  const [localSuccess, setLocalSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const { handleResetPassword } = useAuth()

  const submitForm = async (event) => {
    event.preventDefault()

    if (!newPassword || !confirmPassword) {
      setLocalError('Both password fields are required')
      return
    }

    if (newPassword.length < 6) {
      setLocalError('Password must be at least 6 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setLocalError('Passwords do not match')
      return
    }

    setLocalError('')
    setLocalSuccess('')
    setLoading(true)

    const result = await handleResetPassword({ token, newPassword })

    if (result.success) {
      setLocalSuccess(result.message)
      setNewPassword('')
      setConfirmPassword('')
      // Redirect to login after 3 seconds
      setTimeout(() => navigate('/login'), 3000)
    } else {
      setLocalError(result.message)
    }

    setLoading(false)
  }

  // If no token in URL, show error
  if (!token) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">
            <img src="/perplexity-logo.png" alt="Perplexity" />
            <span className="auth-logo-text">Perplexity</span>
          </div>
          <h1 className="auth-title">Invalid Reset Link</h1>
          <p className="auth-subtitle">
            This password reset link is invalid or has expired.
          </p>
          <div className="alert alert-error">
            <svg className="alert-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="alert-content">No reset token found. Please request a new password reset link.</span>
          </div>
          <p className="auth-footer">
            <Link to="/forgot-password">Request new reset link</Link>
          </p>
        </div>
      </div>
    )
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
        <h1 className="auth-title">Reset your password</h1>
        <p className="auth-subtitle">Enter your new password below.</p>

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
            <span className="alert-content">{localSuccess} Redirecting to login...</span>
          </div>
        )}

        {/* Form */}
        {!localSuccess && (
          <form onSubmit={submitForm} className="auth-form">
            {/* New Password */}
            <div className="form-group">
              <label htmlFor="reset-new-password" className="form-label">
                New Password
              </label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="reset-new-password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value)
                    setLocalError('')
                  }}
                  placeholder="Enter new password"
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

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="reset-confirm-password" className="form-label">
                Confirm Password
              </label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="reset-confirm-password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setLocalError('')
                  }}
                  placeholder="Confirm new password"
                  className="form-input"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
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
                  Resetting...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        )}

        {/* Footer */}
        <p className="auth-footer">
          Remember your password?{' '}
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword
