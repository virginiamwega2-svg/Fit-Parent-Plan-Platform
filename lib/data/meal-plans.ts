import type { MealPlan } from "@/lib/types";

export const mealPlans: MealPlan[] = [
  {
    id: "mp1",
    title: "Weeknight Rescue Plan",
    weeklyPrepMinutes: 55,
    avgDailyCalories: 1900,
    tags: ["family-friendly", "kid-approved"],
    shoppingList: [
      "Chicken thighs (2 lbs)",
      "Greek yogurt",
      "Brown rice",
      "Frozen mixed vegetables",
      "Eggs",
      "Whole-grain wraps",
      "Bananas",
      "Peanut butter",
    ],
    days: [
      {
        day: "Monday",
        meals: [
          { mealType: "Breakfast", name: "Overnight oats + berries", prepTime: 5, calories: 420 },
          { mealType: "Lunch", name: "Chicken rice bowl", prepTime: 12, calories: 540 },
          { mealType: "Dinner", name: "Sheet-pan fajitas", prepTime: 20, calories: 640 },
          { mealType: "Snack", name: "Apple + peanut butter", prepTime: 2, calories: 220 },
        ],
      },
      {
        day: "Tuesday",
        meals: [
          { mealType: "Breakfast", name: "Egg wrap + spinach", prepTime: 8, calories: 390 },
          { mealType: "Lunch", name: "Turkey veggie wrap", prepTime: 10, calories: 510 },
          { mealType: "Dinner", name: "One-pot chili", prepTime: 25, calories: 670 },
          { mealType: "Snack", name: "Greek yogurt + granola", prepTime: 2, calories: 240 },
        ],
      },
      {
        day: "Wednesday",
        meals: [
          { mealType: "Breakfast", name: "Protein smoothie", prepTime: 5, calories: 360 },
          { mealType: "Lunch", name: "Leftover chili bowl", prepTime: 5, calories: 540 },
          { mealType: "Dinner", name: "Baked salmon + potatoes", prepTime: 22, calories: 690 },
          { mealType: "Snack", name: "Cheese sticks + grapes", prepTime: 2, calories: 200 },
        ],
      },
    ],
  },
  {
    id: "mp2",
    title: "Budget Batch-Cook Plan",
    weeklyPrepMinutes: 70,
    avgDailyCalories: 1800,
    tags: ["family-friendly", "budget-conscious"],
    shoppingList: [
      "Ground turkey",
      "Black beans",
      "Canned tomatoes",
      "Pasta",
      "Eggs",
      "Frozen broccoli",
      "Oats",
      "Cheddar",
    ],
    days: [
      {
        day: "Thursday",
        meals: [
          { mealType: "Breakfast", name: "Egg muffins", prepTime: 10, calories: 350 },
          { mealType: "Lunch", name: "Turkey pasta leftovers", prepTime: 6, calories: 560 },
          { mealType: "Dinner", name: "Turkey bean pasta bake", prepTime: 25, calories: 680 },
          { mealType: "Snack", name: "Banana oat bites", prepTime: 3, calories: 200 },
        ],
      },
      {
        day: "Friday",
        meals: [
          { mealType: "Breakfast", name: "Greek yogurt bowl", prepTime: 3, calories: 340 },
          { mealType: "Lunch", name: "Bean quesadilla plate", prepTime: 10, calories: 520 },
          { mealType: "Dinner", name: "Slow cooker chicken stew", prepTime: 20, calories: 650 },
          { mealType: "Snack", name: "Carrots + hummus", prepTime: 2, calories: 180 },
        ],
      },
    ],
  },
  {
    id: "mp3",
    title: "High-Protein Busy Week Plan",
    weeklyPrepMinutes: 60,
    avgDailyCalories: 2000,
    tags: ["kid-approved", "high-protein"],
    shoppingList: [
      "Lean beef mince",
      "Chicken breast",
      "Cottage cheese",
      "Potatoes",
      "Rice",
      "Whole-wheat pasta",
      "Frozen fruit",
      "Spinach",
    ],
    days: [
      {
        day: "Saturday",
        meals: [
          { mealType: "Breakfast", name: "Cottage cheese parfait", prepTime: 4, calories: 380 },
          { mealType: "Lunch", name: "Chicken burrito bowl", prepTime: 12, calories: 560 },
          { mealType: "Dinner", name: "Beef pasta skillet", prepTime: 20, calories: 710 },
          { mealType: "Snack", name: "Protein smoothie", prepTime: 3, calories: 250 },
        ],
      },
      {
        day: "Sunday",
        meals: [
          { mealType: "Breakfast", name: "Egg potato hash", prepTime: 15, calories: 450 },
          { mealType: "Lunch", name: "Chicken sandwich + salad", prepTime: 10, calories: 520 },
          { mealType: "Dinner", name: "Sheet-pan meatballs + veggies", prepTime: 22, calories: 680 },
          { mealType: "Snack", name: "Yogurt + berries", prepTime: 2, calories: 190 },
        ],
      },
    ],
  },
];
