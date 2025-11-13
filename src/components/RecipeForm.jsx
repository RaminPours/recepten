import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RecipeForm({ onAdd }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState(null);

  // Voeg nieuw ingrediëntveld toe
  function addIngredient() {
    setIngredients([...ingredients, ""]);
  }

  // verwijder ingrediëntveld
  function deleteIngredient(index) {
    if (ingredients.length > 1) {
      const value = [...ingredients];
      value.splice(index, 1);
      setIngredients(value);
    }
  };

  // Verander tekst van een ingrediënt
  function changeIngredient(index, value) {
    const copy = [...ingredients];
    copy[index] = value;
    setIngredients(copy);
  }

  // Sla recept op
  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ name, category, ingredients, steps, image });
    navigate("/"); 
  }

  // Een afbeeling uploaden
  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    }
    reader.readAsDataURL(file);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Nieuw recept</h2>

      <label>Naam
        <input className="input" value={name} onChange={e => setName(e.target.value)} required />
      </label>

      <label>Categorie
        <input className="input" value={category} onChange={e => setCategory(e.target.value)} required />
      </label>

      <label>Afbeelding toevoegen 🔗
        <input type="file" className="image-input" accept="image/*" onChange={handleImage} />
        {image && <img src={image} hidden />}
      </label>

      <h3>Ingrediënten</h3>
      {ingredients.map((ing, i) => (
        <input
          key={i}
          className="input"
          value={ing}
          onChange={e => changeIngredient(i, e.target.value)}
          placeholder={`Ingrediënt ${i + 1}`}

        />
      ))}
      <button type="button" className="btn secondary" onClick={addIngredient}>➕ ingrediënt</button>
      {ingredients.length > 1 && (<button type="button" onClick={() => deleteIngredient()}>➖ ingrediënt</button>) }
      
      
      <h3>Bereiding</h3>
      <textarea value={steps} onChange={e => setSteps(e.target.value)} />

      <div className="row" style={{ justifyContent: "flex-end" }}>
        <button type="button" className="btn secondary" onClick={() => navigate(-1)}>Annuleren</button>
        <button className="btn" type="submit">Opslaan</button>
      </div>
    </form>
  );
}
