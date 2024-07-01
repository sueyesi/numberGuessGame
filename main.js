//랜덤번호 지정
//유저가 번호를 입력, go버튼 클릭
// 만약에 랜덤번호를 맞추면, "정담"
//랜던번호가 < 유저번호 down 메세지 출력 기회를 깍는다
//랜덤번호 > 유저번호 up 메세지 출력 기회를 깍는다
// rest버튼 누르면 게임 리셋
// 주어진 기회를 다 쓰면 게임이 끝 (버튼 disable)
// 유저가 범위 밖 숫자를 입력하면 알려준다, 기회는 깍지 않는다.
// 유저가 이미 한번 입력한 숫자를 입력하면 알려준다, 기회를 깍지 않는다 (history)


let computerNum = 0;
let playButton = document.getElementById("playButton");
let userInput = document.getElementById("userInput");
let resultArea = document.getElementById("resultArea");
let resetButton = document.getElementById("resetButton");
let chances = 5;
let gameOver = false;
let chancesArea = document.getElementById("chancesArea");
let history = [] //히스토리를 배열로 만든다


playButton.addEventListener("click", play); //클릭시 play라는 함수를 넣어준다
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){ //
    userInput.value="";
})

function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 10)+1; // 1~30까지 랜덤번호 지정
    console.log("정답", computerNum)    
}

function play(){
    //유저번호를 가져온다
    let userValue = userInput.value;
        //유효성검사
        if(userValue<1 || userValue>10){
            resultArea.textContent="1과 30사이 숫자를 입력해 주세요"
            return;//종료
        }
        if(history.includes(userValue)){
            resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요"
            return;
        }
        chances--; 
        chancesArea.textContent = `남은기회 : ${chances}`;//백틱을 쓰면 동적인 값과 정적인 값을 같이 줄수있다
        console.log("chances", chances);
    if (userValue < computerNum){        
        resultArea.textContent = "up"

    }else if(userValue > computerNum){        
        resultArea.textContent = "doWn"

    }else{        
        resultArea.textContent = "정답입니다"
        gameOver=true;
    }

    history.push(userValue);
    console.log(history)

    if(chances < 1){
        gameOver = true;
    }

    if(gameOver == true){
        playButton.disabled = true;
    }
}

function reset(){
    //user input 정리
    userInput.value = "";
    resultArea.textContent ="게임을 새로 시작합니다."    
    gameOver = false;
    //새로운 정답 생성한다.
    pickRandomNum(); 
}

pickRandomNum();