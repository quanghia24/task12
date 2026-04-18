// node -v
// v24.11.0

/*
Problem:
Given a list of numbers and a number k, return whether any two numbers from
the list add up to k..

Input [10, 15, 3, 7] and k of 17
Output return true since 10 + 7 is 17.
*/


testcases = [
  {
    input: [10, 15, 3, 7],
    k: 17,
    expected_output: true // 10 + 7
  },
  {
    input: [5,75,25],
    k: 100,
    expected_output: true // 75 + 25
  },
  {
    input: [3,3],
    k: 6,
    expected_output: true // 3 + 3
  },
  {
    input: [],
    k: 0,
    expected_output: false // < 2 number
  },
  {
    input: [10],
    k: 10,
    expected_output: false // < 2 number
  }
]

function sumOfTwo(nums, k) {
  const len = nums.length
  if (len < 2) {
    return false;
  }

  let visited = new Map();

  for (let i = 0; i < len; i++) {
    let remainder = k - nums[i];
    if (visited.has(remainder)) {
      return true;
    }
    visited.set(nums[i], true);
  }
  return false;
}

for (const [index, testcase] of testcases.entries()) {
  let output = sumOfTwo(testcase.input, testcase.k);
  console.log(`test ${index}: "${testcase.input}" => ${output} (${testcase.expected_output == output ? "PASS" : "FAIL"})`);
}

// note: Loop through each number, use a hashmap to store visited node to fast luckup to the remainder of the target number.

// time: O(n)
// space: O(n)