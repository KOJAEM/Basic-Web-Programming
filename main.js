const gender = document.querySelector("#gender");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const age = document.querySelector("#age");
const firstProgress = document.querySelector("#firstProgress");
let bmiResult;
let removeId;

$(document).ready(() => {
  if (!localStorage.getItem("firstState")) {
    // 처음 접속하여 firstState값이 없을때
    $(".first").css("display", "flex");
    localStorage.setItem("id", Number(1)); // 다이어리 아이디값
    return;
  }
  $(".second").css("display", "flex"); // 로그인을 하여 로컬스토리지에 값이 있을때
  $(".second").css("opacity", 1);
  updateStatePage();
  firstProgress.style.width = `${localStorage.getItem("firstBmiProgress")}%`;
});

const movePage = (now, next) => {
  $(`.${now}`).css("opacity", 0);
  setTimeout(() => {
    $(`.${now}`).css("display", "none");
    $(`.${next}`).css("display", "flex");
  }, 1200);
  setTimeout(() => {
    $(`.${next}`).css("opacity", "1");
  }, 1500);
};

// first
document.querySelector("#okButton").addEventListener("click", e => {
  e.preventDefault();
  // input 창에 입력되지 않은 것이 있을때
  if (!gender.value || !height.value || !weight.value || !age.value) {
    alert("모든 정보를 입력해주세요.");
    return;
  }
  // 로컬스토리지에 값을 넣음
  localStorage.setItem("gender", gender.value);
  localStorage.setItem("height", Number(height.value));
  localStorage.setItem("weight", Number(weight.value));
  localStorage.setItem("age", Number(age.value));
  localStorage.setItem("bmi", bmiCalc(localStorage.getItem("weight"), localStorage.getItem("height")));
  localStorage.setItem("firstState", localStorage.getItem("bmi"));
  localStorage.setItem(
    "firstBmiProgress",
    (localStorage.getItem("firstState") * 100) / 40
  );
  firstProgress.style.width = `${localStorage.getItem("firstBmiProgress")}%`;

  alert(
    "현재 상태는 이후에 얼마든지 수정 가능합니다\n성공적인 다이어트를 기원합니다."
  );

  // 페이지 업데이트
  updateStatePage();

  movePage("first", "second");
});

// second

const nowProgress = document.querySelectorAll("#nowProgress");

const updateStatePage = () => {
  // 현재 체중에 따라 그래프 색깔 바뀜 (firstState 그래프는 마젠타 색으로 고정해놨음.)
  if (localStorage.getItem("bmi") < 18.5) {
    bmiResult = "저체중";
    nowProgress.forEach(now => {
      now.style.backgroundColor = "#a19c91";
    });
  } else if (localStorage.getItem("bmi") < 23) {
    bmiResult = "정상";
    nowProgress.forEach(now => {
      now.style.backgroundColor = "#5e96ff";
    });
  } else if (localStorage.getItem("bmi") < 25) {
    bmiResult = "과체중";
    nowProgress.forEach(now => {
      now.style.backgroundColor = "#5e96ff";
    });
  } else if (localStorage.getItem("bmi") < 30) {
    bmiResult = "경도비만";
    nowProgress.forEach(now => {
      now.style.backgroundColor = "#e3f57f";
    });
  } else if (localStorage.getItem("bmi") < 35) {
    bmiResult = "중등도비만";
    nowProgress.forEach(now => {
      now.style.backgroundColor = "#7bed8a";
    });
  } else {
    bmiResult = "고도비만";
    nowProgress.forEach(now => {
      now.style.backgroundColor = "#f22c22";
    });
  }

  document.querySelector(
    "#informBmi"
  ).innerHTML = `사용자님의 BMI 수치는 ${localStorage.getItem("bmi")}입니다.`;
  document.querySelector(
    "#informState"
  ).innerHTML = `BMI 수치 결과에 따라 당신은 ${bmiResult}입니다.`;
  // 100% 를 bmi 수치 40으로 치고 계산
  let progressWidth = (localStorage.getItem("bmi") * 100) / 40;
  nowProgress.forEach(now => {
    now.style.width = `${progressWidth}%`;
  });
};

document.querySelector("#nextButton").addEventListener("click", () => {
  movePage("second", "third");
  updateDiary();
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
          "#a19c91",
          "#5e96ff",
          "#e3f57f",
          "#7bed8a",
          "#f22c22",
        ],
        borderColor: ["#a19c91", "#5e96ff", "#e3f57f", "#7bed8a", "#f22c22"],
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

document.querySelector("#changeBmi").addEventListener("click", () => {
  const changingHeight = prompt("본인의 키를 입력해주세요.");
  const changingWeight = prompt("변경된 체중을 입력해주세요.");
  const changingAge = prompt("변경된 나이를 입력해주세요. (숫자로 입력)");

  // 입력되지 않은것이 있을때
  if (!changingHeight || !changingWeight || !changingAge) {
    alert("모든 정보를 입력해주세요.");
    return;
  }
  // bmi 계산
  const changingBmi = bmiCalc(changingWeight, changingHeight);

  if(Number.isNaN(changingBmi)) {
    alert("숫자만 입력 가능합니다.")
    return;
  }


  const result = confirm(`
  변경된 키 : ${changingHeight}\n
  변경된 체중 : ${changingWeight}\n
  변경된 나이 : ${changingAge} 가 맞습니까?`);

  if (result) {
    localStorage.setItem("height", changingHeight);
    localStorage.setItem("weight", changingWeight);
    localStorage.setItem("age", changingAge);
    localStorage.setItem("bmi", changingBmi);
    updateStatePage();
    alert("변경되었습니다.");
  } else {
    alert("수정이 취소되었습니다.");
  }
});

document.querySelector("#moveSecond").addEventListener("click", () => {
  movePage("third", "second");
});

const updateDiary = () => {
  const diary = JSON.parse(localStorage.getItem("diary"));
  const diaryWrapper = document.querySelector(".diaryWrapper");
  if (!diary) return;
  diaryWrapper.innerHTML = "";
  diary.forEach(thatDayDiary => {
    diaryWrapper.innerHTML += `
    <li class="diary"
    data-day=${JSON.stringify(thatDayDiary.day)}
    data-intensity=${JSON.stringify(thatDayDiary.intensity)}
    data-contents=${JSON.stringify(thatDayDiary.contents)}
    data-id=${JSON.stringify(thatDayDiary.id)}
    onclick="diaryClick(this)"
    >${thatDayDiary.day}<br />운동난이도 : ${thatDayDiary.intensity}</li>`;
  });
};

// 다이어리 쓰기
const modalWrapper = document.querySelector(".modalWrapper");
const today = new Date();
const date = document.querySelector("#date");
document.querySelector("#writeDiary").addEventListener("click", () => {
  document.querySelector("#date").innerHTML = `${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;
  modalWrapper.style.display = "flex";
  setTimeout(() => {
    modalWrapper.style.width = "100%";
    modalWrapper.style.opacity = 1;
  }, 100);
});

const intensity = document.querySelector("#intensity");
const diaryContents = document.querySelector("#diaryContents");
document.querySelector("#writeCancel").addEventListener("click", () => {
  modalCancel(modalWrapper);
});

document.querySelector("#writeSave").addEventListener("click", () => {
  if (!intensity.value || !diaryContents.value) {
    alert("모든 정보를 입력해주세요.");
    return;
  }
  const id = Number(localStorage.getItem("id"));
  const todayDiary = {
    id,
    day: date.innerHTML,
    intensity: intensity.value,
    contents: diaryContents.value,
  };
  localStorage.setItem("id", id+1); // 로컬스토리지 id값을 +1 시킴.

  todayDiary.contents = todayDiary.contents.replace(/\n/gi, "<br>");
  const diary = localStorage.getItem("diary");
  // 다이어리를 처음 만들때만 실행
  if (!diary) {
    const diaryArray = [];
    diarySave(diaryArray, todayDiary);
    return;
  }
  const diaryArray = JSON.parse(diary);
  diarySave(diaryArray, todayDiary);
});

const modalCancel = modal => {
  modal.style.width = "0%";
  modal.style.opacity = 0;
  intensity.value = "";
  diaryContents.value = "";

  setTimeout(() => {
    modal.style.display = "none";
  }, 1000);
};

const diarySave = (diaryArray, todayDiary) => {
  diaryArray.unshift(todayDiary);
  localStorage.setItem("diary", JSON.stringify(diaryArray));
  alert("저장 되었습니다.");
  updateDiary();
  modalCancel(modalWrapper);
};

// 다이어리 클릭
const clickModalWrapper = document.querySelector(".clickModalWrapper");
const clickModalContent = document.querySelector(".clickModalContent");
const diaryClick = diary => {
  removeId = Number(diary.dataset.id);
  document.querySelector("#thatDate").innerHTML = diary.dataset.day;
  document.querySelector("#thatDayIntensity").innerHTML = diary.dataset.intensity;
  document.querySelector(".thatDayContents").innerHTML = diary.dataset.contents;

  clickModalWrapper.style.display = "flex";
  setTimeout(() => {
    clickModalWrapper.style.width = "100%";
    clickModalWrapper.style.opacity = 1;
  }, 100);
};

document.querySelector("#clickCancel").addEventListener("click", () => {
  modalCancel(clickModalWrapper);
});

const bmiCalc = (weight, height) => {
  return Number(
    Math.round((Number(weight) / (Number(height) / 100) ** 2) * 100) / 100
  );
}

document.querySelector("#remove").addEventListener("click", () => {
  const diaryAll = JSON.parse(localStorage.getItem("diary"));
  const changingDiary = [];
  changingDiary.push(diaryAll.filter(diary => diary.id !== removeId))
  localStorage.setItem("diary", JSON.stringify(changingDiary.flat()))
  // flat() : 중첩 배열을 벗기는 메소드
  alert("삭제 되었습니다.")
  updateDiary();
  modalCancel(clickModalWrapper);
})