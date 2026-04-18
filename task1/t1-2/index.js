// node -v
// v24.11.0

// Problem:
// RLE (Run-length encoding) is a compressing data algorithm, it save data like this: the number of data + data.
// Implement this algorithm. Input data only use English Upppercase : Letter A → Z.

// Input:
// AABBBCCCCCAADDDD
// PPPQRRRSTTQQS
// XYZ

// Output:
// 2A3B5C2A4D
// 3PQ3RS2T2QS
// XYZ

const testcases = [
  {
    input: "AABBBCCCCCAADDDD",
    expected_output: "2A3B5C2A4D"
  },
  {
    input: "PPPQRRRSTTQQS",
    expected_output: "3PQ3RS2T2QS"
  },
  {
    input: "XYZ",
    expected_output: "XYZ"
  },
  {
    input: "A",
    expected_output: "A"
  },
  {
    input: "AA",
    expected_output: "2A"
  },
  {
    input: "AAA",
    expected_output: "3A"
  },
  {
    input: "AAAA",
    expected_output: "4A"
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
    input: "  ",
    expected_output: "2 "
  },
  {
    input: "AB",
    expected_output: "AB"
  },
  {
    input: "ABBCCCDDDDEEEEEFFFFFF",
    expected_output: "A2B3C4D5E6F"
  },
  {
    input: "ABABABAB",
    expected_output: "ABABABAB"
  }
]

function compressStringWithRLE(str) {
  let idx = 0, lastIdx = 0, len = str.length;
  let res = "";

  while (idx < len) {
    let cnt = 0;

    while(idx < len && str[idx] == str[lastIdx]) {
      cnt++;
      idx++;
    }
    if (cnt > 1) {
      res += cnt
    }

    res += str[lastIdx];
    lastIdx = idx;
  }

  return res;
}

for (const [index, testcase] of testcases.entries()) {
  let output = compressStringWithRLE(testcase.input);
  console.log(`test ${index}: "${testcase.input}" => ${output} (${testcase.expected_output == output ? "PASS" : "FAIL"})`);
}

// note: I count the number of consecutive characters and append the count to the result string.

// time: O(n)
// space: O(n)


