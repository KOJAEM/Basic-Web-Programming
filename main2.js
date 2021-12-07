const progress = document.querySelector("#progress");
const nextBtn = document.querySelector("#nextBtn");
const informBmi = document.querySelector("#informBmi");
const informState = document.querySelector("#informState");

// const bmiResult  = bmi 에 따라 저체중, 정상, 비만 나누기


informBmi.innerHTML = `사용자님의 BMI 수치는 OOOO입니다.`;
informState.innerHTML = `BMI 수치 결과에 따라 당신은 OOOO입니다.`;



nextBtn.addEventListener('click', () => {
  console.log("클릭");
})

// progress.style.width = "10%";


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
              position : "top"
            }
          }
        }
      })