import React from "react";
import { useState, useEffect } from "react";
import api from './services/api';


import "./styles.css";

function App() {

  const [repositories, setRepository] = useState([]);

  useEffect(()=> {
    api.get('repositories').then(response => {
      setRepository(response.data);
    }) 
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      owner: "Gleyson Silvino"
    });
    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO

    await api.delete(`repositories/${id}`);

    setRepository(repositories.filter(repositories => repositories.id !== id));


  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <li key={repository.id}>
          {repository.title}
          <button 
            onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>) )}
      </ul>

      <button 
        onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  );
}

export default App;
