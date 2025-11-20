import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import RecipeList from "./components/RecipeList.jsx";
import RecipeForm from "./components/RecipeForm.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";
import {
  WhatsappShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

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
  const [open, setOpen] = useState(false);
  

  // url om te delen 
  const shareUrl = window.location.origin;
  const shareText = "Bekijk mijn recepten!";

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
   <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* LINKER SIDEBAR */}
      <aside
        style={{
          width: open ? "200px" : "70px",
          borderRight: "1px solid #ddd",
          padding: "14px",
          background: "#f5f5f5",
          boxSizing: "border-box",
          transition: "width 0.25s ease",
        }}
      >
        {/* Menu inklappen */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          style={{
            padding: "6px 8px",
            marginBottom: "12px",
            width: "100%",
            cursor: "pointer",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "#fff",
            fontSize: "13px",
          }}
        >
          {open ? "⬅️ Menu inklappen" : "➡️"}
        </button>

        {/* Titel alleen tonen als open */}
        {open && <h3 style={{ marginTop: "15px", marginBottom: 12 }}>Menu</h3>}

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            marginTop: "10px",
          }}
        >
          <NavLink
            to="/"            
            style={{
              padding: "8px 10px",
              textDecoration: "none",
              color: "#000000ff",
              fontSize: "14px",
            }}
          >
            {open ? "📚 Alle recepten" : "📚"}
          </NavLink>

          <NavLink
            to="/nieuw"
            style={{
              padding: "8px 10px",
              textDecoration: "none",
              color: "#333",
              fontSize: "14px",
            }}
          >
            {open ? "➕ Nieuw recept" : "➕"}
          </NavLink>
        </nav>

        {open ? <h4 style={{marginTop: "50px"}}>Deel je recepten!</h4> : ""}
       {open && (<div style={{display: "flex", gap: "10px", marginTop: "20px"}}>
      
      <FacebookMessengerShareButton url="shareUrl" share="shareText">
      <FacebookIcon size={30} borderRadius={30}></FacebookIcon>
      </FacebookMessengerShareButton> 
      
      <WhatsappShareButton url="shareUrl" share="shareText">
      <WhatsappIcon size={30} borderRadius={30}></WhatsappIcon>
      </WhatsappShareButton>

      <TwitterShareButton url="shareUrl" share="shareText">
        <TwitterIcon size={30} borderRadius={30}></TwitterIcon>
      </TwitterShareButton>  

      <EmailShareButton url="shareUrl" share="shareText">
      <EmailIcon size={30} borderRadius={30}></EmailIcon>
      </EmailShareButton>
      </div>)}          
      </aside>


      {/* ==== RECHTERKANT  ==== */}
      <main style={{ flex: "1", padding: "15px" }}>
        <div className="container">
          <Routes>
            <Route path="/" element={<RecipeList recipes={recipes} />} />
            <Route path="/nieuw" element={<RecipeForm onAdd={addRecipe} />} />
            <Route
              path="/recept/:id"
              element={<RecipeDetail recipes={recipes} onDelete={deleteRecipe} />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}
