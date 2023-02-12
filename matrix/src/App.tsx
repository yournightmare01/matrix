function App() {
  type Coordinates = number[];
  type Result = Array<{
    movingObjectCoordinates: Coordinates;
    blockingObjectCoordinates: Array<number[]>;
  }>;

  function findWay(
    n: number,
    start: number[],
    end: number[],
    numBlockingObjects: number
  ): Result {
    let result: Result = [];
    let MO = start;
    let BO: Coordinates[] = [];
    let matrix: number[][] = [];

    for (let i = 0; i < n; i++) {
      matrix[i] = [];
      for (let j = 0; j < n; j++) {
        matrix[i][j] = 0;
      }
    }

    while (MO[0] !== end[0] || MO[1] !== end[1]) {
      result.push({
        movingObjectCoordinates: MO.slice(),
        blockingObjectCoordinates: BO.slice(),
      });
      // Mark the current position of the object as a blocking object
      BO.push(MO.slice());
      matrix[MO[0]][MO[1]] = 1;

      // Check if the object can move vertically or horizontally
      if (MO[0] < end[0]) {
        MO[0]++;
      } else if (MO[0] > end[0]) {
        MO[0]--;
      } else if (MO[1] < end[1]) {
        MO[1]++;
      } else if (MO[1] > end[1]) {
        MO[1]--;
      }

      //empty blockingObjects array if it BO blocks all the paths
      if (isBlocked(matrix, MO, n) || BO.length === numBlockingObjects) {
        return [
          {
            movingObjectCoordinates: MO.slice(),
            blockingObjectCoordinates: [],
          },
        ];
      }
    }

    result.push({
      movingObjectCoordinates: MO.slice(),
      blockingObjectCoordinates: BO.slice(),
    });

    return result;
  }

  function isBlocked(matrix: number[][], MO: Coordinates, n: number): boolean {
    return (
      //Check if the moving object can move up
      (MO[0] === 0 || matrix[MO[0] - 1][MO[1]] === 1) &&
      //Check if the moving object can move down
      (MO[0] === n - 1 || matrix[MO[0] + 1][MO[1]] === 1) &&
      //Check if the moving object can move left
      (MO[1] === 0 || matrix[MO[0]][MO[1] - 1] === 1) &&
      //Check if the moving object can move right
      (MO[1] === n - 1 || matrix[MO[0]][MO[1] + 1] === 1)
    );
  }

  //can not import from .env :(

  // const n = import.meta.env.VITE_APP_MATRIX_SIZE;
  // const start = import.meta.env.VITE_APP_MATRIX_START;
  // const end = import.meta.env.VITE_APP_MATRIX_END;
  // const numBlockingObjects = import.meta.env.VITE_APP_MATRIX_BO;

  const n = 10;
  const start = [0, 0];
  const end = [9, 9];
  const numBlockingObjects = 5;

  const result = findWay(n, start, end, numBlockingObjects);

  console.log(result);

  return <div className='App'></div>;
}

export default App;
