"use client"

import { useState, useContext } from "react"
import styled from "styled-components"
import { AuthContext } from "../context/AuthContext"

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`

const Input = styled.input`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
`

const Button = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`

// eslint-disable-next-line react/prop-types
function GoalForm({ onGoalAdded }) {
  const [description, setDescription] = useState("")
  const [targetDate, setTargetDate] = useState("")
  const { token } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:5000/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description, targetDate }),
      })
      if (response.ok) {
        setDescription("")
        setTargetDate("")
        onGoalAdded()
      }
    } catch (error) {
      console.error("Error adding goal:", error)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Add Goal</h3>
      <Input
        type="text"
        placeholder="Goal description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} required />
      <Button type="submit">Save Goal</Button>
    </Form>
  )
}

export default GoalForm

