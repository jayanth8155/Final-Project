import styled from "styled-components"

const GoalItem = styled.div`
  background-color: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
`

// eslint-disable-next-line react/prop-types
function GoalList({ goals }) {
  return (
    <div>
      {goals.map((goal) => (
        <GoalItem key={goal._id}>
          <h3>{goal.description}</h3>
          <p>Target Date: {new Date(goal.targetDate).toLocaleDateString()}</p>
          <p>Status: {goal.completed ? "Completed" : "In Progress"}</p>
        </GoalItem>
      ))}
    </div>
  )
}

export default GoalList

