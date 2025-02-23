"use client"

import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { AuthContext } from "../context/AuthContext"
import WorkoutList from "../components/WorkoutList"
import GoalList from "../components/GoalList"
import WorkoutForm from "../components/WorkoutForm"
import GoalForm from "../components/GoalForm"

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`

const Section = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 5px;
`

function Dashboard() {
  const { token } = useContext(AuthContext)
  const [workouts, setWorkouts] = useState([])
  const [goals, setGoals] = useState([])

  useEffect(() => {
    fetchWorkouts()
    fetchGoals()
  }, [])

  const fetchWorkouts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/workouts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setWorkouts(data)
    } catch (error) {
      console.error("Error fetching workouts:", error)
    }
  }

  const fetchGoals = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/goals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setGoals(data)
    } catch (error) {
      console.error("Error fetching goals:", error)
    }
  }

  return (
    <DashboardContainer>
      <Section>
        <h2>Workouts</h2>
        <WorkoutList workouts={workouts} />
        <WorkoutForm onWorkoutAdded={fetchWorkouts} />
      </Section>
      <Section>
        <h2>Goals</h2>
        <GoalList goals={goals} />
        <GoalForm onGoalAdded={fetchGoals} />
      </Section>
    </DashboardContainer>
  )
}

export default Dashboard

