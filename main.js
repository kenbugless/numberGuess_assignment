// 랜덤번호 지정
// 유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름 
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다.
// 랜덤번호 < 유저번호 Down !!
// 랜덤번호 > 유저번호 Up !!
// Reset 버튼을 누르면 게임이 리셋된다. 
// 5번의 기회를 다 쓰면, 게임이 끝난다. (더 이상 추측 불가, 버튼이 Disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다. 
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다.

//랜덤번호를 저장해 둘 변수가 필요하다.
let computerNum = 0;
let playButton = document.getElementById('play-button');
let userInput = document.getElementById('user-input');
let resultArea = document.getElementById('result-area');
let resetButton = document.getElementById('reset-button');
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById('chance-area');
let history = [];

playButton.addEventListener('click',play); //click 이벤트를 play라는 함수에 넣어줘라// 함수를 매개변수처럼 들어가면 () 빼줘야 된다.
resetButton.addEventListener('click',reset);
userInput.addEventListener('focus',function(){userInput.value=""});

function pickRandomNum() {
    computerNum = Math.floor(Math.random()*100)+1
    console.log("정답",computerNum)
}

pickRandomNum();

function play() {
    let userValue = userInput.value;
    if(userValue <1 || userValue >100) {
        resultArea.textContent="1과 100 사이 숫자를 입력해주세요"
        return
    }

    if(history.includes(userValue)) {
        resultArea.textContent =  "이미 입력한 숫자야! 다른 숫자 입력해!";
        return;
    }

    chances--;
    chanceArea.textContent = `남은 찬스 : ${chances}`
    console.log(chances);
    if(userValue < computerNum) {
        resultArea.textContent = "Up";
        // console.log("Up");
    }else if(userValue > computerNum) {
        resultArea.textContent = "Down";
        // console.log("Down");
    }else {
        resultArea.textContent = "정답";
        // console.log("정답");
        gameOver = true; //밑에 if(gameOver == true )에 대한 내용이 있다.
    }

    history.push(userValue)
    console.log(history)

    if(chances <1) {
        gameOver = true;
    }
    if(gameOver ==true) {
        playButton.disabled = true;
    }
}

function reset() {
    //user input 창이 깨끗하게 정리되고
    userInput.value = "";
    //새로운 번호가 생성되고
    pickRandomNum()
    resultArea.textContent = '결과가 여기 나온다';
    chances = 5;
    history=[];
    resultArea.textContent='결과가 나온다'
    chanceArea.textContent = `남은 찬스는 ${chances}입니다`
}