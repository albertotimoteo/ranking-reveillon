import { useState } from "react"
import { useLocalStorage } from "./hooks/useLocalStorage"
import Edit from "./assets/icons/pencil.svg"
import Beer from "./assets/images/beers.png"
import Gold from "./assets/images/gold_medal.png"
import Silver from "./assets/images/silver_medal.png"
import Bronze from "./assets/images/bronze_medal.png"
import "./assets/styles/App.css"
import Winners from "./Winners"

const getAsset = (index) => {
  if (index === 0) {
    return <img src={Gold} width={50} height={50} />
  }
  if (index === 1) {
    return <img src={Silver} width={50} height={50} />
  }
  if (index === 2) {
    return <img src={Bronze} width={50} height={50} />
  }
  return index + 1
}

function App() {
  const [personsList, setPersonsList] = useLocalStorage("personsList", "[]")
  const [startDate, setStartDate] = useLocalStorage("startDate", "")
  const [finishDate, setFinishDate] = useLocalStorage("finishDate", "")
  const [person, setPerson] = useState({})
  const [isShowingForm, setIsShowingForm] = useState(false)
  const [isEditing, setIsEditing] = useState(null)
  const [newScore, setNewScore] = useState(0)
  const [screen, setScreen] = useState("RANKING")

  const orderArrayAndSave = (list) => {
    list.sort((a, b) => Number(b.score) - Number(a.score))
    setPersonsList(JSON.stringify(list))
  }

  return (
    <div className="container">
      {screen === "RANKING" ? (
        <>
          <div className="titleContainer">
            <img src={Beer} width={120} height={200} />
            <div className="titleDiv">
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
                  : `Finalizada: ${new Date(finishDate).toLocaleDateString(
                      "pt-BR"
                    )}`}
              </h1>
            </div>
            <img src={Beer} width={120} height={200} />
          </div>
          <table className="table">
            <tr>
              <th>#</th>
              <th>NOME:</th>
              <th>TEOR ALCOÓLICO:</th>
              {Boolean(startDate) && <th>Editar</th>}
            </tr>
            {JSON.parse(personsList).map((mapPerson, index) => (
              <tr key={index}>
                <td>{getAsset(index)}</td>
                <td>{mapPerson.name}</td>
                {isEditing === index ? (
                  <td>
                    <input
                      value={newScore}
                      onChange={(event) => setNewScore(event.target.value)}
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
            <button
              onClick={() => {
                if (!finishDate) {
                  setFinishDate(new Date())
                  return
                }
                setFinishDate("")
              }}
            >
              {!finishDate ? "Finalizar corrida" : "Reabrir corrida"}
            </button>
            {Boolean(finishDate) && (
              <button onClick={() => setScreen("RESULT")}>
                Mostrar vencedores
              </button>
            )}
            <button
              onClick={() => {
                setPersonsList("[]")
                setFinishDate("")
                setStartDate("")
              }}
            >
              Limpar dados
            </button>
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
        </>
      ) : (
        <Winners
          winners={JSON.parse(personsList).slice(0, 3)}
          setScreen={setScreen}
        />
      )}
    </div>
  )
}

export default App
