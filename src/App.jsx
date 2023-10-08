import { useState } from "react"

const App = () => {

  const [player, setPlayer] = useState("X")
  const [scores, setScores] = useState({
    playerX: 0,
    playerO: 0
  })
  const [winner, setWinner] = useState(null)
  const [gameBoard, setGameBoard] = useState(Array(9).fill(""))



  const winningCombination = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  const checkWinner = (board) => {
    for(const combination of winningCombination){
      const [a, b, c] = combination

      if (board[a] === board[b] && board[b] === board[c]){
        return board[a]
      }
    }

    return null
  }

  const checkDraw = (board) => {
    return board.every(cell => cell !== "")
  }


  const handleCellChange = (id) => {

    if (winner || gameBoard[id]){
      return
    }

    const updatedBoard = [...gameBoard]
    updatedBoard[id] = player

    const winnerResult = checkWinner(updatedBoard)


    if (winnerResult){

      if (winnerResult === "X") {
        const newScores = {
          ...scores,
          playerX: scores.playerX + 1
        }

        setScores(newScores)
      }

      else {
        const newScores = {
          ...scores,
          playerO: scores.playerO + 1
        }

        setScores(newScores)
      }

      setWinner(winnerResult)
    }

    else {

      const isDraw = checkDraw(updatedBoard)

      if (isDraw){
        setWinner("draw")
      }

      else {
        setPlayer(player === "X" ? "O" : "X")
      }

    }

    setGameBoard(updatedBoard)

  }


  const restartGame = () => {
    setPlayer("X")
    setGameBoard(Array(9).fill(""))
    setWinner(null)
  }
  

  return (
    <>
      <h1 className="text-4xl font-serif text-center p-12 font-black text-gray-200">Tic Tac Toe</h1>
      <main className="bg-gray-500 rounded-lg shadow-xl max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">

        <section className="p-8 text-lg font-medium flex justify-around">
          <div className="bg-gray-400 w-48 h-10 flex justify-between rounded-md shadow-lg">
            <p className="px-8 py-2">X</p>
            <p className="px-8 py-2">{scores.playerX ? scores.playerX : "-"}</p>
          </div>
          <div className="bg-gray-400 w-48 h-10 flex justify-between rounded-md shadow-lg">
            <p className="px-8 py-2">O</p>
            <p className="px-8 py-2">{scores.playerO ? scores.playerO : "-"}</p>
          </div>
        </section>
        <section className="grid grid-cols-3 gap-3 max-w-full">
         {gameBoard.map((cell, id) => (
          <button key={id} onClick={()=>handleCellChange(id)} className="bg-green-300 h-20 text-center text-gray-600 text-5xl font-semibold">{cell}</button>
          ))}
        </section>  
        <p className="p-4 text-center">
        <button onClick={restartGame} className="font-extrabold text-green-300 text-lg lg:text-2xl">Restart game</button>
        </p>
      </main>
    </>
  )
} 

export default App
