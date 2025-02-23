import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

const HomeContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const SummarySection = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
`;

const SummaryCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  width: 30%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const CardContent = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 2rem;

  &:hover {
    background-color: #0056b3;
  }
`;

function Home() {
  const { isAuthenticated, token } = useContext(AuthContext);
  const [workoutCount, setWorkoutCount] = useState(0);
  const [goalCount, setGoalCount] = useState(0);
  const [completedGoals, setCompletedGoals] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSummary();
    }
  }, [isAuthenticated]);

  const fetchSummary = async () => {
    try {
      const workoutsResponse = await fetch('http://localhost:5000/api/workouts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const workoutsData = await workoutsResponse.json();
      setWorkoutCount(workoutsData.length);

      const goalsResponse = await fetch('http://localhost:5000/api/goals', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const goalsData = await goalsResponse.json();
      setGoalCount(goalsData.length);
      setCompletedGoals(goalsData.filter(goal => goal.completed).length);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  return (
    <HomeContainer>
      <Title>Welcome to Workout Tracker</Title>
      <Subtitle>Track your workouts, set goals, and achieve your fitness dreams!</Subtitle>
      
      {isAuthenticated ? (
        <>
          <SummarySection>
            <SummaryCard>
              <CardTitle>Total Workouts</CardTitle>
              <CardContent>{workoutCount}</CardContent>
            </SummaryCard>
            <SummaryCard>
              <CardTitle>Active Goals</CardTitle>
              <CardContent>{goalCount}</CardContent>
            </SummaryCard>
            <SummaryCard>
              <CardTitle>Completed Goals</CardTitle>
              <CardContent>{completedGoals}</CardContent>
            </SummaryCard>
          </SummarySection>
          <CTAButton to="/dashboard">Go to Dashboard</CTAButton>
        </>
      ) : (
        <>
          <CTAButton to="/register">Get Started</CTAButton>
          <p style={{ marginTop: '1rem' }}>Already have an account? <Link to="/login">Login</Link></p>
        </>
      )}
    </HomeContainer>
  );
}

export default Home;
