"use client"

import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        setToken(data.token)
        setIsAuthenticated(true)
        localStorage.setItem("token", data.token)
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (username, email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const logout = () => {
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, register, logout }}>{children}</AuthContext.Provider>
  )
}

