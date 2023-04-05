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
      <h4 className="mt-2">Total de empréstimos: {totalEmprestimos}</h4>
    </div>
  );
}

  return (
    <div className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark" } >
      <div className="home" id="backg">
        <TotalEmprestimos />
      </div>
    </div>

  );
}

