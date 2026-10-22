export default function GameOver({ winner, hasDraw, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game over!</h2>
      <p>{!hasDraw ? `You won, ${winner}!` : "It's a draw!"}</p>
      <p>
        <button onClick={onRestart}>Restart</button>
      </p>
    </div>
  );
}
