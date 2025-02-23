"use client"

import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { AuthContext } from "../context/AuthContext"

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`

const SuccessMessage = styled.p`
  color: green;
  margin-top: 1rem;
`

function Profile() {
  const { token } = useContext(AuthContext)
  const [user, setUser] = useState({ username: "", email: "" })
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setUser(data)
      } else {
        setError("Failed to fetch user profile")
      }
    } catch (error) {
        console.log(error)
      setError("An error occurred while fetching the profile")
    }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      })
      if (response.ok) {
        setSuccess("Profile updated successfully")
        setError("")
      } else {
        setError("Failed to update profile")
        setSuccess("")
      }
    } catch (error) {
        console.log(error)
      setError("An error occurred while updating the profile")
      setSuccess("")
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (password.new !== password.confirm) {
      setError("New passwords do not match")
      return
    }
    try {
      const response = await fetch("http://localhost:5000/api/users/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: password.current,
          newPassword: password.new,
        }),
      })
      if (response.ok) {
        setSuccess("Password changed successfully")
        setError("")
        setPassword({ current: "", new: "", confirm: "" })
      } else {
        setError("Failed to change password")
        setSuccess("")
      }
    } catch (error) {
        console.log(error)
      setError("An error occurred while changing the password")
      setSuccess("")
    }
  }

  return (
    <ProfileContainer>
      <Title>User Profile</Title>
      <Form onSubmit={handleProfileUpdate}>
        <Input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Button type="submit">Update Profile</Button>
      </Form>

      <Title>Change Password</Title>
      <Form onSubmit={handlePasswordChange}>
        <Input
          type="password"
          placeholder="Current Password"
          value={password.current}
          onChange={(e) => setPassword({ ...password, current: e.target.value })}
        />
        <Input
          type="password"
          placeholder="New Password"
          value={password.new}
          onChange={(e) => setPassword({ ...password, new: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={password.confirm}
          onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
        />
        <Button type="submit">Change Password</Button>
      </Form>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </ProfileContainer>
  )
}

export default Profile

