const changeBmi = document.querySelector("#changeBmi");
changeBmi.addEventListener("click", () => {
  const height = prompt("본인의 키를 입력해주세요.");
  const weight = prompt("변경된 몸무게를 입력해주세요.");
  const age = prompt("변경된 나이를 입력해주세요.");

  // 입력되지 않은것이 있을때
  if (!height || !weight || !age) {
    alert("모든 정보를 입력해주세요.");
    return;
  }

  result = confirm(`
  변경된 키 : ${height}\n
  변경된 몸무게 : ${weight}\n
  변경된 나이 : ${age} 가 맞습니까?`);
  console.log(result);
});
