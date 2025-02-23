import styled from "styled-components"

const WorkoutItem = styled.div`
  background-color: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
`

function WorkoutList({ workouts }) {
  return (
    <div>
      {workouts.map((workout) => (
        <WorkoutItem key={workout._id}>
          <h3>{new Date(workout.date).toLocaleDateString()}</h3>
          <ul>
            {workout.exercises.map((exercise, index) => (
              <li key={index}>
                {exercise.name}: {exercise.sets} sets, {exercise.reps} reps, {exercise.weight} lbs
              </li>
            ))}
          </ul>
        </WorkoutItem>
      ))}
    </div>
  )
}

export default WorkoutList

