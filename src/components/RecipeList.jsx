import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RecipeList({ recipes }) {
  const [zoekterm, setZoekterm] = useState("");
  const navigate = useNavigate();

  // Filter recepten op zoekterm
  const gefilterd = recipes.filter(r =>
    r.name.toLowerCase().includes(zoekterm.toLowerCase())
  );

  return (
    <>
      <div className="toolbar">
        <h1>Recepten</h1>
        <button className="btn" onClick={() => navigate("/nieuw")}>
          + Recept toevoegen
        </button>
      </div>

      <input
        className="input"
        placeholder="Zoek recept..."
        value={zoekterm}
        onChange={e => setZoekterm(e.target.value)}
      />

      <div className="grid">
        {gefilterd.map(r => (
          <Link key={r.id} to={`/recept/${r.id}`} className="card">
            {r.image && <img src={r.image} />}
            <div className="body">
              <strong>{r.name}</strong>
              <div className="badge">{r.category}</div>
            </div>
          </Link>
        ))}
      </div>

      {gefilterd.length === 0 && <p className="center">Geen recepten gevonden.</p>}
    </>
  );
}
