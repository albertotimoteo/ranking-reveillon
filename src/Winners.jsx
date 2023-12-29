/* eslint-disable react/prop-types */
import Beer from "./assets/images/beers.png"
import Gold from "./assets/images/gold_medal.png"
import Silver from "./assets/images/silver_medal.png"
import Bronze from "./assets/images/bronze_medal.png"
import "./assets/styles/Winners.css"

const Winners = ({ winners, setScreen }) => {
  console.log(typeof winners[2].score)
  return (
    <>
      <div className="wrapper">
        <h3>Os maiores cachaceiros de</h3>
        <div className="yearContainer">
          <img src={Beer} width={80} height={120} />
          <h1>2023</h1>
          <img src={Beer} width={80} height={120} />
        </div>
      </div>
      <div>
        <div className="winner">
          <img src={Gold} width={200} height={250} />
          <span>{winners[0].name}</span>
          <span>{Number(winners[0].score).toFixed(2)}</span>
        </div>
        <div className="secondRow">
          <div className="winner">
            <img src={Silver} width={200} height={250} />
            <span>{winners[1].name}</span>
            <span>{Number(winners[1].score).toFixed(2)}</span>
          </div>
          <div className="winner">
            <img src={Bronze} width={200} height={250} />
            <span>{winners[2].name}</span>
            <span>{Number(winners[2].score).toFixed(2)}</span>
          </div>
        </div>
        <button onClick={() => setScreen("RANKING")}>Voltar</button>
      </div>
    </>
  )
}

export default Winners
