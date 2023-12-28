import { useState } from "react"
import { useLocalStorage } from "./hooks/useLocalStorage"
import Edit from "./assets/icons/pencil.svg"
import "./assets/styles/App.css"

function App() {
  const [personsList, setPersonsList] = useLocalStorage("personsList", "[]")
  const [startDate, setStartDate] = useLocalStorage("startDate", "")
  const [finishDate, setFinishDate] = useLocalStorage("finishDate", "")
  const [person, setPerson] = useState({})
  const [isShowingForm, setIsShowingForm] = useState(false)
  const [isEditing, setIsEditing] = useState(null)
  const [newScore, setNewScore] = useState(0)

  const orderArrayAndSave = (list) => {
    list.sort((a, b) => Number(b.score) - Number(a.score))
    setPersonsList(JSON.stringify(list))
  }

  return (
    <div>
      <div>
        <h1>
          {!startDate
            ? "Corrida ainda não iniciada"
            : `Corrida iniciada: ${new Date(startDate).toLocaleDateString(
                "pt-BR"
              )}`}
        </h1>
        <h1>
          {!finishDate
            ? "Corrida não finalizada"
            : `Finalizada: ${new Date(finishDate).toLocaleDateString("pt-BR")}`}
        </h1>
      </div>
      <table>
        <th>
          <td>#</td>
          <td>NOME:</td>
          <td>TEOR ALCOÓLICO:</td>
        </th>
        {JSON.parse(personsList).map((mapPerson, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{mapPerson.name}</td>
            {isEditing === index ? (
              <td>
                <input
                  value={newScore}
                  onChange={(event) => setNewScore(event.target.valueAsNumber)}
                  type="number"
                />
              </td>
            ) : (
              <td>{mapPerson.score}</td>
            )}
            {startDate && !finishDate && (
              <button
                onClick={() => {
                  if (isEditing === null) {
                    setNewScore(mapPerson.score)
                    setIsEditing(index)
                    return
                  }
                  orderArrayAndSave([
                    ...JSON.parse(personsList).filter(
                      (listPerson) => listPerson.name !== mapPerson.name
                    ),
                    { ...mapPerson, score: newScore },
                  ])
                  setIsEditing(null)
                  setNewScore(null)
                }}
              >
                {isEditing === index ? "OK" : <img src={Edit} />}
              </button>
            )}
          </tr>
        ))}
      </table>
      <div>
        <button onClick={() => setIsShowingForm(true)}>
          Adicionar novo participante
        </button>
        <button onClick={() => setStartDate(new Date())}>
          Iniciar corrida
        </button>
        <button onClick={() => setFinishDate(new Date())}>
          Finalizar corrida
        </button>
        {Boolean(finishDate) && (
          <button onClick={() => {}}>Mostrar vencedores</button>
        )}
      </div>
      {isShowingForm && (
        <div>
          <label>
            Nome:
            <input
              value={person.name}
              onChange={(event) =>
                setPerson({ ...person, name: event.target.value })
              }
            />
          </label>
          <label>
            Teor Alcoólico:
            <input
              type="number"
              value={person.score}
              onChange={(event) =>
                setPerson({ ...person, score: event.target.value })
              }
            />
          </label>
          <button
            onClick={() => {
              orderArrayAndSave([...JSON.parse(personsList), { ...person }])
            }}
          >
            Adicionar
          </button>
          <button onClick={() => setIsShowingForm(false)}>
            Finalizar adição
          </button>
        </div>
      )}
    </div>
  )
}

export default App
