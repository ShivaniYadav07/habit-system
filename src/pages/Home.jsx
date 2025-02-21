import React, { useEffect, useState } from "react";
import { Card } from "../utility/Card";
import { Button } from "../utility/Button";

 const Home = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setHabits([
        { id: 1, name: "Exercise", streak: 5 },
        { id: 2, name: "Reading", streak: 10 },
        { id: 3, name: "Meditation", streak: 3 }
      ]);
    }, 1000);
  }, []);
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center ">Your Habit Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-pink-500 to-red-500 ">
          <Card.Header>Total Habits</Card.Header>
          <Card.Content>
            <p className="text-4xl font-bold">{habits.length}</p>
          </Card.Content>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-teal-500">
          <Card.Header>Longest Streak</Card.Header>
          <Card.Content>
            <p className="text-4xl font-bold">{Math.max(...habits.map(h => h.streak), 0)} days</p>
          </Card.Content>
        </Card>
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 ">
          <Card.Header>Completed Today</Card.Header>
          <Card.Content>
            <p className="text-4xl font-bold">0</p>
          </Card.Content>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.length === 0 ? (
          <p className="text-center ">No habits added yet.</p>
        ) : (
          habits.map((habit) => (
            <Card key={habit.id} className="shadow-lg rounded-xl transform transition duration-300 hover:scale-105">
              <Card.Header>{habit.name}</Card.Header>
              <Card.Content>
                <p className="">Current Streak: {habit.streak} days</p>
                <Button className="mt-4 w-full hover:shadow-lg">
                  Mark Done
                </Button>
              </Card.Content>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;