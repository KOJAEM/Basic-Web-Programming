const gender = document.querySelector("#gender");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const age = document.querySelector("#age");
const user = {};
const okButton = document.querySelector("#okBtn");
let bmiResult;
let progressWidth;
// 스토리지에 user 값이 있으면 second 의 display:none 을 삭제해야함. (나중에 수정)

$(document).ready(() => {
  $(".first").css("display", "flex"); // 제이쿼리 사용
});

okButton.addEventListener("click", (e) => {
  e.preventDefault();
  // input 창에 입력되지 않은 것이 있을때
  if (!gender.value || !height.value || !weight.value || !age.value) {
    alert("모든 정보를 입력해주세요.");
    return;
  }
  user.gender = gender.value;
  user.height = Number(height.value);
  user.weight = Number(weight.value);
  user.age = Number(age.value);
  user.bmi = Number(
    Math.round((user.weight / (user.height / 100) ** 2) * 100) / 100
  );

  // second 로딩에 필요한것들
  updateSecondPage();

  $(".first").css("display", "none");
  $(".second").css("display", "flex");
});

// second

const progress = document.querySelector("#progress");
const nextBtn = document.querySelector("#nextBtn");
const informBmi = document.querySelector("#informBmi");
const informState = document.querySelector("#informState");

const updateSecondPage = () => {
  if (user.bmi < 18.5) bmiResult = "저체중";
  else if (user.bmi < 23) bmiResult = "정상";
  else if (user.bmi < 25) bmiResult = "과체중";
  else if (user.bmi < 30) bmiResult = "경도비만";
  else if (user.bmi < 35) bmiResult = "중등도비만";
  else bmiResult = "고도비만";
  informBmi.innerHTML = `사용자님의 BMI 수치는 ${user.bmi}입니다.`;
  informState.innerHTML = `BMI 수치 결과에 따라 당신은 ${bmiResult}입니다.`;
  // 100% 를 40으로 치고 계산
  let progressWidth = (user.bmi*100)/40
  progress.style.width = `${progressWidth}%`;
}

nextBtn.addEventListener("click", () => {
  $(".second").css("display", "none");
  $(".third").css("display", "flex");
});

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["저체중", "정상+과체중", "경도비만", "중등도비만", "고도비만"],
    datasets: [
      {
        data: [3, 58, 32, 6, 1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        position: "top",
      },
    },
  },
});

// third

const changeBmi = document.querySelector("#changeBmi");
const moveSecond = document.querySelector("#moveSecond");

changeBmi.addEventListener("click", () => {
  const changingHeight = prompt("본인의 키를 입력해주세요.");
  const changingWeight = prompt("변경된 몸무게를 입력해주세요.");
  const changingAge = prompt("변경된 나이를 입력해주세요.");

  // 입력되지 않은것이 있을때
  if (!changingHeight || !changingWeight || !changingAge) {
    alert("모든 정보를 입력해주세요.");
    return;
  }

  result = confirm(`
  변경된 키 : ${changingHeight}\n
  변경된 몸무게 : ${changingWeight}\n
  변경된 나이 : ${changingAge} 가 맞습니까?`);

  if (result) {
    user.height = changingHeight;
    user.weight = changingWeight;
    user.age = changingAge;
    user.bmi = Number(
      Math.round((user.weight / (user.height / 100) ** 2) * 100) / 100
    );
    updateSecondPage();
    alert("변경되었습니다.");
  }
  else {
    alert("수정이 취소되었습니다.");
  }
});

moveSecond.addEventListener("click", () => {
  $(".third").css("display", "none");
  $(".second").css("display", "flex");
})