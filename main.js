const gender = document.querySelector("#gender");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const age = document.querySelector("#age");
const user = { }
const okButton = document.querySelector("#okBtn");
okButton.addEventListener("click", (e) => {
    e.preventDefault();
    // input 창에 입력되지 않은 것이 있을때
    if(!gender.value || !height.value || !weight.value || !age.value)
    {
        alert("모든 정보를 입력해주세요.");
        return;
    }
    user.gender = gender.value;
    user.height = Number(height.value);
    user.weight = Number(weight.value);
    user.age = Number(age.value);
    user.bmi = Math.round((user.weight/((user.height/100)**2))*100)/100;
    console.log("사용자님의 BMI 수치는",user.bmi);
});


