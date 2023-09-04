import { ChangeEvent, useState } from "react";
import MealList from "../components/MealList";
import "../App.css";

import type { IMealData } from "../components/MealList";

function HomePage() {
  const [mealData, setMealData] = useState<IMealData | undefined>(undefined);
  const [calories, setCalories] = useState<number>(2000);

  interface mealData {
    mealData: string;
  }

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=a06780308db84b47aebc5e4d8cb9abd6&timeFrame=day&targetCalories=${calories}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
        setMealData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCalories(Number(e.target.value));
  }

  return (
    <div className="App">
      <div className="Welcome Page">
        <section className="controls">
          <input type="number" placeholder="Calories (e.g. 2000)" onChange={handleChange} />
          <button onClick={getMealData}>Get Daily Meal Plan</button>
        </section>
        {mealData && <MealList mealData={mealData} />}
      </div>
    </div>
  );
}

export default HomePage;
