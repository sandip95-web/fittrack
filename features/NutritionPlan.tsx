"use client";
import React from "react";
export default function NutritionPlan(){
  return (<div className="space-y-4">
    <div className="card">
      <div className="font-semibold mb-1">Targets (lean bulk)</div>
      <ul className="list-disc pl-5 text-sm space-y-1">
        <li>Calories: ~2700 kcal/day (adjust +/–200 based on weekly weight trend)</li>
        <li>Protein: ~120 g/day (~2.0 g/kg)</li>
        <li>Fat: 65–80 g/day</li>
        <li>Carbs: Fill the rest</li>
        <li>Water: 3+ L/day</li>
      </ul>
    </div>
    <div className="card">
      <div className="font-semibold mb-1">Simple Nepali-friendly plan</div>
      <div className="text-sm space-y-2">
        <div><b>Breakfast</b>: 2–3 eggs or paneer bhurji + roti, or curd + banana + peanuts. (Whey optional.)</div>
        <div><b>Lunch (office)</b>: Dal bhat + veg + palm-size protein (chicken/buff or paneer/soy). Add a spoon of ghee for calories.</div>
        <div><b>Snack</b>: Banana + milk/curd + 1 tbsp peanut butter; or chana/soy chunks.</div>
        <div><b>Dinner</b>: Similar to lunch; slightly less rice. Hit protein target.</div>
        <div><b>Before bed</b>: Milk/curd or small paneer portion if protein is short.</div>
      </div>
    </div>
    <div className="card">
      <div className="font-semibold mb-1">Quick habits</div>
      <ul className="list-disc pl-5 text-sm space-y-1">
        <li>1 protein source each meal (egg/chicken/buff/paneer/soy/yogurt/whey)</li>
        <li>Carry water; sip 250 ml each hour</li>
        <li>Fruit + leafy veg daily for fiber</li>
      </ul>
    </div>
  </div>);
}
