// 보건복지부_우한폐렴 시도 발생현황 API를 이용해서 특정지역의 확진자 출력
// https://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api
// serviceKey=B3vwYzTiX5fhDvELyU0et7PBBK38hsVRfmdjyLb8AiqTnlWKhqCGGgEiAFu7Gh1ulUPTOs%2FKHe6qsnzbv%2FCJow%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EC%A0%84%EA%B5%AD&ver=1.0

// 사용할 패키지 가져오기 : require('패키지명')
const axios = require("axios"); // Ajax 라이브러리
const { XMLParser } = require("fast-xml-parser");

async function main() {
  // 비동기 지원 함수 정의
  // 접속할 url 지정, 쿼리스트링, user-agent 헤더 지정
  // https://www.data.go.kr/iim/api/selectAPIAcountView.do에서 미리보기 눌렀을때 질의문자열('?'로 시작) 앞까지의 url 복사해서 URL에 할당
  const URL = "http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api";
  const params = {
    // serviecekey는 일반인증키(Decoding)
    servicekey:
      "B3vwYzTiX5fhDvELyU0et7PBBK38hsVRfmdjyLb8AiqTnlWKhqCGGgEiAFu7Gh1ulUPTOs/KHe6qsnzbv/CJow==",
    numOfRows: 1000,
    apiType: "xml", // xml 또는 JSON, json 이라고 소문자는 안됨
    std_day: "2023-02-12",
  };
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78",
  };

  // url을 axios로 비동기적으로 접속해서 시도별 우한폐렴 발생현황을 받아옴
  const xml = await axios.get(URL, {
    params: params,
    headers: headers,
  }); // 서버 요청시 User-Agent 헤더 사용,  HTTP 응답 객체로 반환

  // 받아온 데이터 확인
  // console.log(xml);
  // console.log(xml.data);

  // XML 을 JSON 객체로 변환
  const parser = new XMLParser();
  let json = parser.parse(xml.data);

  // console.log(json)
  // JSON으로 불러오기
  let items = json.response.body.items; // response내의 body내의 items
  // console.log(items['item']);
  //
  // 미세먼지 정보 출력
  // pm25Value는 출력안됨! -> 파라미터에 버전 1.3으로 설정하니 됨
  for (let item of items.item) {
    console.log(
      `시도: ${item.gubun}, 누적확진자: ${item.defCnt}, 일자: ${item.stdDay}`
    );
  }
}

main();
