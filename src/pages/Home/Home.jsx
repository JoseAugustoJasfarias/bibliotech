import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export function Home() {

  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;



  return (
    
    <div className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark" }>
      <h1>HOME</h1>
    </div>
    
  );
}
