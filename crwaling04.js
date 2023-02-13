// 미세먼지 공공테이터를 이용해서 특정 지역의 미세먼지 정보 출력
// http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty
// serviceKey=B3vwYzTiX5fhDvELyU0et7PBBK38hsVRfmdjyLb8AiqTnlWKhqCGGgEiAFu7Gh1ulUPTOs%2FKHe6qsnzbv%2FCJow%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EC%A0%84%EA%B5%AD&ver=1.0

// 사용할 패키지 가져오기 : require('패키지명')
const axios = require("axios"); // Ajax 라이브러리
const { XMLParser } = require("fast-xml-parser"); // xml 처리기 라이브러리

// 비동기 지원 함수 정의
async function main() {

  // 접속할 url 지정, 쿼리스트링, user-agent 헤더 지정
  // https://www.data.go.kr/iim/api/selectAPIAcountView.do에서
  // 미리보기 눌렀을때 질의문자열('?'로 시작) 앞까지의 url 복사해서 URL에 할당
  // https 아니고 http로 써야함
  // 인증 vs 인가
  const URL =
    "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";

  // 요청변수(Request Parameter) 설정
  const params = {
    // serviecekey는 일반인증키(Decoding)
    servicekey:
      "B3vwYzTiX5fhDvELyU0et7PBBK38hsVRfmdjyLb8AiqTnlWKhqCGGgEiAFu7Gh1ulUPTOs/KHe6qsnzbv/CJow==",
    returnType: "xml",
    numOfRows: 1000,
    sidoName: "서울",
    ver: 1.3,
  };

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78",
  };

  // url을 axios로 비동기적으로 접속해서 대기오염 정보를 받아옴
  const xml = await axios.get(URL, {
    params: params,
    headers: headers,
  }); // 서버 요청시 User-Agent 헤더 사용,  HTTP 응답 객체로 반환

  // 받아온 데이터 확인
  // console.log(xml);
  // console.log(xml.data);

  // XML 을 JSON 으로 변환
  const parser = new XMLParser();
  let json = parser.parse(xml.data);
  // console.log(json);

  // let items = json.response.body.items;  // 이렇게도 됨
  let items = json["response"]["body"]["items"]; // response내의 body내의 items
  // console.log(items);  // 출력해보면 items 객체 개부의 item이라는 배열 내부에 데이터들이 객체형태로 담겨있다
  // 미세먼지 정보 출력
  // pm25Value는 출력안됨! -> 파라미터에 버전 1.3으로 설정하니 됨
  for (let item of items["item"]) { // items.item 이라고 써도 됨
    console.log(
      item.sidoName,
      item.stationName,
      item.pm10Value,
      item.pm25Value,
      pmGrade(item.pm10Grade),
      pmGrade(item.pm25Grade),
      item.dataTime
    );
  }
}

// 등급별 이모지
let pmGrade = (val) => {
  let emojis = ["😄", "😐", "😣", "😱"];
  return emojis[parseInt(val) - 1];
};

main();
