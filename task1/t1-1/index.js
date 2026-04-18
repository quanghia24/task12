// node -v
// v24.11.0

// Problem: Giving a random string, write a function arrange all characters according alphabet table
// input: webmaster
// output: abeemrstw

const testcases = [
  {
    input: "webmaster",
    expected_output: "abeemrstw"
  },
  {
    input: "3452  345dasdf=^-&^",
    expected_output: "  &-2334455=^^addfs"
  },
  {
    input: "zYxWvU",
    expected_output: "UWYvxz"
  },
  {
    input: "1092837465",
    expected_output: "0123456789"
  },
  {
    input: "",
    expected_output: ""
  },
  {
    input: " ",
    expected_output: " "
  },
  {
    input: "  c a  ",
    expected_output: "     ac"
  },
  {
    input: "123abcABC",
    expected_output: "123ABCabc"
  },
  {
    input: "!!!@@@",
    expected_output: "!!!@@@"
  }
];

function quicksort(arr) {
  const len = arr.length
  if (len <= 1) {
    return arr;
  }
  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < len; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quicksort(left) + pivot + quicksort(right);
}

for (const [index, testcase] of testcases.entries()) {
  let output = quicksort(testcase.input);
  console.log(`test ${index}: "${testcase.input}" => "${output}" (${testcase.expected_output == output ? "PASS" : "FAIL"})`);
}


/*
note:
I used quicksort to solve this problem because it's one of the most efficient sorting algorithms.
Quick sort have a problem in performance when the input is sorted, but since we expect a total random string so I think it should be fine.
If we are expecting to work with sorted string, we can shuffle the string first to make it random.
*/

// time: O(n log n)
// space: O(n)