// hanb.co.kr 사이트의 새로나온 책에 대한 정보를 긁어오기
// https://www.hanbit.co.kr/store/books/new_book_list.html

// 사용할 패키지 가져오기 : require('패키지명')
// 패키지명 클릭하고 alt enter 누르고 설치하면된다(처음 한번만)
const axios = require('axios');

const main = () => {

    // 접속할 url 지정
    const URL = 'https://www.hanbit.co.kr/store/books/new_book_list.html';

    // axios로 접속해서 html을 불러옴
    axios.get(URL)  // URL에 get 요청해 HTTP 응답객체 반환
        .then((html) => {   // 반환값을 html이라는 매개변수로 지정하는 함수
            // 불러온 html을 콘솔에 출력
            console.log(html.data); // HTTP 응답객체를 html 코드로 바꿔서 출력
        })
        .catch((error) => { // 에러났을때의 반환값을 매개변수로 지정하는 함수 실행
            console.log(error); //
        });
};

main();

