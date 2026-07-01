import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth.js'
import { useSelector } from 'react-redux'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const { handleLogin } = useAuth()
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
      console.log('Login Error:', error)
    }
  }, [error])

  const submitForm = async (event) => {
    event.preventDefault()
    
    if (!email || !password) {
      setLocalError('Email and password are required')
      return
    }

    setLocalError('')
    const payLoad = {
      email,
      password
    }

    await handleLogin(payLoad)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h2>

        {localError && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-100 rounded-lg text-sm">
            {localError}
          </div>
        )}

        <form onSubmit={submitForm} className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Link to Register */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-green-500 hover:text-green-400 font-medium transition"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login