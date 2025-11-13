import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RecipeList from "./components/RecipeList.jsx";
import RecipeForm from "./components/RecipeForm.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";

function loadRecipes() {
  try {
    const data = localStorage.getItem("recepten");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveRecipes(list) {
  localStorage.setItem("recepten", JSON.stringify(list));
}

export default function App() {
  const [recipes, setRecipes] = useState(loadRecipes);

  // slaat elke verandering op
  useEffect(() => {
    saveRecipes(recipes);
  }, [recipes]);

  // nieuwe recept toevoegen
  function addRecipe(newRecipe) {
    const recipe = { ...newRecipe, id: crypto.randomUUID() };
    setRecipes((prev) => [recipe, ...prev]);
  }

  // recept verwijderen
  function deleteRecipe(id) {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<RecipeList recipes={recipes} />} />
        <Route path="/nieuw" element={<RecipeForm onAdd={addRecipe} />} />
        <Route path="/recept/:id" element={<RecipeDetail recipes={recipes} onDelete={deleteRecipe} />} />
      </Routes>
    </div>
  );
}
