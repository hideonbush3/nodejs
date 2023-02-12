// hanb.co.kr 사이트의 새로나온 책에 대한 정보를 긁어오기
// https://www.hanbit.co.kr/store/books/new_book_list.html

// 사용할 패키지 가져오기 : require('패키지명')
const axios = require('axios');     // Ajax 라이브러리
const cheerio = require('cheerio');   // DOM 라이브러리

async function main() {  // 비동기 지원 함수 정의

    // 접속할 url 지정
    const URL = 'https://www.hanbit.co.kr/store/books/new_book_list.html';

    // url을 axios로 비동기적으로 접속해서 html을 불러옴
    const html = await axios.get(URL);   // 비동기 I/O 지원  HTTP 응답 객체로 반환
    // console.log(html);

    // 불러온 html을 parsing해서 DOM 생성
    const dom = cheerio.load(html.data);    // HTML 코드를 파싱해서 도큐먼트 객체형태로 dom 변수에 저장
    // console.log(html.data);     // HTTP 응답 객체의 data 프로퍼티에는 웹 페이지의 HTML 코드가 저장되있음
    // console.log(dom);

    // CSS 선택자로 도서 제목을 담고 있는 요소 지정
    let elements = dom('.book_tit');    // dom 변수에 저장된 값에 CSS 선택자로 요소 찾기가능


    // 찾은 요소를 순회하면서 텍스트 출력
    elements.each((idx, title)=>{
        console.log(dom(title).text());
    })

    // CSS 선택자로 저자를 담고 있는 요소 지정
    elements = dom('.book_writer');
    elements.each((idx, title) =>{
        console.log(dom(title).text());
    })

    // CSS 선택자로 가격을 담고 있는 요소 지정
    elements = dom('.price');
    elements.each((idx, title) => {
        console.log(dom(title).text());
    })
};

main();