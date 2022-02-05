// 回答コードに対する補足
// 使用した言語・・・TypeScript
// ※ESLint、prettierを使用しコードを整形しています。
// by 松本葉月

/// /////////////////////////////////////////
// # 【株式会社ビットエー】 プログラミング課題
// 以下 4 つの問いに対して、ソースコード、所要時間、回答言語の提出をお願いいたします。

// <補足>
// * 言語指定はございません（例はJavaScriptで書かれています）
// * 制限時間はございません
// * ソースコードに関するコメントがございましたら、併せて提出をお願いいたします

// <注意>
// * 回答や問題については、できるだけ一般公開しないようにお願いします

// ---

/// //////////////////////////////////////////////
// ## 問1
// もっとも短い単語を探し、その文字数を返す関数を作成して下さい。

// 例：
// ```js
// shortest('red blue yellow green'); // -> 3
// ```

// 回答：
// ```js
// function shortest(str) {
//   // write your answer
// }
/// //////////////////////////////////////////////

// 問1回答
export const shortestWordLength = (content: string) => {
  const array = content.split(' ');

  const shortestWord = array.reduce((minValue, currentValue) => {
    if (minValue.length > currentValue.length) {
      return currentValue;
    }

    return minValue;
  });

  return shortestWord.length;
};

/// //////////////////////////////////////////////
// ## 問2
// 連続する文字をなくした文字列を返す関数を作成して下さい。

// 例：
// ```js
// format('abbccccaabc') // -> abcabc
// format('bbitaaa') // -> bita
// ```

// 回答：
// ```js
// function format(str) {
//   // write your answer
// }
/// //////////////////////////////////////////////

// 問2回答

export const deleteConsecutiveChar = (word: string) => {
  const array = word.split('');
  const answer = array.reduce((result, currentChar) => {
    const lastChar = result.slice(-1);
    if (lastChar === currentChar) {
      return result;
    }

    return result.concat(currentChar);
  });

  return answer;
};

/// //////////////////////////////////////////////
// ## 問3
// 配列に1つだけ違う数字が入っています。その数字を返す関数を作成して下さい。
// ※ 配列には最低3つ以上の数字が入ります。

// 例：
// ```js
// findUniqueNumber([1, 5, 1, 1, 1, 1])  // -> 5
// findUniqueNumber([0, 0, 0, 3])  // -> 3
// ```

// 回答：
// ```js
// function findUniqueNumber(array) {
//   // write your answer
// }
/// //////////////////////////////////////////////

// 問3回答

export const findUniqueNumber = (numbers: number[]) => {
  const uniqueNumber = numbers.filter((element, _, _numbers) => {
    const numberOfElement = _numbers.filter(
      (_element) => _element === element,
    ).length;

    return numberOfElement === 1;
  });

  return uniqueNumber[0];
};

/// //////////////////////////////////////////////
// ## 問4
// N x Nの2次元配列があります。
// 反時計回りで左上から中央まで一筆で数字を通ったときの配列を返す関数を作成して下さい。

// 例：
// ```js
// const matrix = [
//   [6, 2, 1],
//   [5, 4, 9],
//   [3, 8, 7],
// ]
// getSpiralPath(matrix) // -> [6, 5, 3, 8, 7, 9, 1, 2, 4]
/// //////////////////////////////////////////////

// 問4回答

export const takeSpiralPath = (array: number[][]) => {
  const result: number[] = [];

  // ① 左側の1列を取り除いてresultに格納
  // ② 残った配列を時計回りに90°回転
  // ③ ①+②を再帰的に実行する関数
  const cutAndRotate = (_array: number[][]) => {
    // ① 左側の1列を取り除いてresultに格納
    const arrayAfterRemoveLeftRow = _array.map((innerArray) => {
      result.push(innerArray[0]);
      innerArray.shift();

      return innerArray;
    });

    const rowLength = arrayAfterRemoveLeftRow.length;

    if (rowLength === 0) {
      return;
    }

    const colLength = arrayAfterRemoveLeftRow[0].length;
    const create2dArray = (row: number, col: number) =>
      [...Array<number>(row)].map((_) => Array<number>(col).fill(0));

    const rotateArray = create2dArray(colLength, rowLength);

    // ②残った配列を時計回りに90°回転
    arrayAfterRemoveLeftRow.forEach((innerArray, rowIndex) => {
      innerArray.forEach((number, colIndex) => {
        rotateArray[colIndex][rowLength - 1 - rowIndex] = number;
      });
    });

    // ③ ①+②を再帰的に実行する
    cutAndRotate(rotateArray);
  };

  cutAndRotate(array);

  return result;
};
