function testRun(data) {
  let finalSum = data;
  for (let x=0; x<=5; x++) {
    finalSum = finalSum + x;
    console.log(finalSum);
  }
  return finalSum;
}

console.log(`Total Sum = ${testRun(10)}`);