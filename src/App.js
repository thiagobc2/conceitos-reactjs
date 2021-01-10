import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([])

  useEffect(()=>{
    api.get("repositories").then(response => {
      setRepositories(response.data)
    })
  },[])

  async function handleAddRepository() {
    // TODO
    const dt = Date()
    const response = await api.post("repositories", {
      title: `Teste - ${dt}`,
      url: 'http://google.com',
      techs: ['tech1', 'tech2', 'tech4'],
      likes: 0,
    })

    setRepositories([...repositories, response.data])

    console.log(response)
    
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`repositories/${id}`)

    const arr = await repositories
    const repositoriesFilter = await arr.filter(item => deletaItem(item, id))

    setRepositories(repositoriesFilter)
  }

  function deletaItem(item, id){
    return item.id != id
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return(  
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
