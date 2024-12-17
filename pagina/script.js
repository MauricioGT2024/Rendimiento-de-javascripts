const $globalCode = document.querySelector("#global");
const $sendButton = document.querySelector(".send-button");

async function runTest({ code, data }) {
  const duration = 1000;

  let result
  try {
    result = await eval(`(async () => {
     let PERF__ops = 0;
     let PERF__start = Date.now();
     let PERF__end = Date.now() + ${duration};
     ${data};
 
     while (Date.now() < PERF__end) {
     ${code};
     PERF__ops++;
    }
     return PERF__ops
    })()`);
  } catch (error) {
    console.log(error)
    result = 0;
  }

  return result;
}
async function runTestCases() {
  const $testCases = document.querySelectorAll(".test-case");

  const globalCode = $globalCode.value;

  $testCases.forEach(async testCase => {
    const $code = testCase.querySelector(".code");
    const $ops = testCase.querySelector(".ops");

    const codeValue = $code.value;
    $ops.textContent = "Cargando...";

    const result = await runTest({ code: codeValue, data: globalCode });
    console.log(result);
  });
}

runTestCases();

$sendButton.addEventListener("click", () => {
  runTestCases();
});
