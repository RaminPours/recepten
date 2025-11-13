import { Link, useParams, useNavigate } from "react-router-dom";

export default function RecipeDetail({ recipes, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return <p className="center">Recept niet gevonden.</p>;
  }

  return (
    <article className="card" style={{ padding: 16}}>
      {recipe.image && <img src={recipe.image} className="hero" />}
      <h2>{recipe.name}</h2>
      <p className="meta">{recipe.category}</p>

      <h3>Ingrediënten</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
      </ul>

      <h3>Bereiding</h3>
      <p>{recipe.steps}</p>

      <div className="row" style={{ justifyContent: "space-between" }}>
        <Link className="btn secondary" to="/">👈 Terug</Link>
        <button className="btn" onClick={() => { onDelete(recipe.id); navigate("/"); }}>Verwijderen</button>
      </div>
    </article>
  );
}
