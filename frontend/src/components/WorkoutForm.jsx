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

function WorkoutForm({ onWorkoutAdded }) {
  const [date, setDate] = useState("")
  const [exercises, setExercises] = useState([{ name: "", sets: "", reps: "", weight: "" }])
  const { token } = useContext(AuthContext)

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises]
    updatedExercises[index][field] = value
    setExercises(updatedExercises)
  }

  const handleAddExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", weight: "" }])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:5000/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date, exercises }),
      })
      if (response.ok) {
        setDate("")
        setExercises([{ name: "", sets: "", reps: "", weight: "" }])
        onWorkoutAdded()
      }
    } catch (error) {
      console.error("Error adding workout:", error)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Add Workout</h3>
      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      {exercises.map((exercise, index) => (
        <div key={index}>
          <Input
            type="text"
            placeholder="Exercise name"
            value={exercise.name}
            onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Sets"
            value={exercise.sets}
            onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Reps"
            value={exercise.reps}
            onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Weight (lbs)"
            value={exercise.weight}
            onChange={(e) => handleExerciseChange(index, "weight", e.target.value)}
            required
          />
        </div>
      ))}
      <Button type="button" onClick={handleAddExercise}>
        Add Exercise
      </Button>
      <Button type="submit">Save Workout</Button>
    </Form>
  )
}

export default WorkoutForm

