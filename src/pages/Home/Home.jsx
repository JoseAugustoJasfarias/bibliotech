import { ThemeContext } from "../../contexts/ThemeContext";
import { useState, useEffect, useContext } from "react";
import { getEmprestimos } from '../../firebase/emprestimos';
import "./Home.css"

export function Home() {

  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;

function TotalEmprestimos() {
  
  const [totalEmprestimos, setTotalEmprestimos] = useState(0);

  useEffect(() => {
    async function fetchEmprestimos() {
      const emprestimos = await getEmprestimos();
      setTotalEmprestimos(emprestimos.length);
    }
    fetchEmprestimos();
  }, []);

  return (
    <div>
      <h1>Total de empréstimos: {totalEmprestimos}</h1>
    </div>
  );
}

  return (
    <div className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark" } >
      <div className="home">
        <h1>HOME</h1>
        <TotalEmprestimos />
      </div>
    </div>

  );
}

