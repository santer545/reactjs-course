export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn, index) => {
        const { square, player } = turn;
        const { row, col } = square;
        const message = `Player ${player} moved to row ${row + 1}, col ${col + 1}`;
        return <li key={index}>{message}</li>;
      })}
    </ol>
  );
}
