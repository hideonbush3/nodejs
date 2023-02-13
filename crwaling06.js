// 미세먼지 공공테이터를 이용해서 특정 지역의 미세먼지 정보 출력
// https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty
// https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=B3vwYzTiX5fhDvELyU0et7PBBK38hsVRfmdjyLb8AiqTnlWKhqCGGgEiAFu7Gh1ulUPTOs%2FKHe6qsnzbv%2FCJow%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EC%A0%84%EA%B5%AD&ver=1.0
// 사용할 패키지 가져오기 : require('패키지명')
const cheerio = require("cheerio"); // DOM 라이브러리
// 셀레니움 사용법
// https://www.selenium.dev/documentation/webdriver/getting_started/first_script/
const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

async function main() {
  // 비동기 I/O 지원 함수 정의

  // 접속할 url 지정
  const URL = "https://movie.daum.net/main";

  // 크롬 자동화 브라우저 객체 생성
  const chrome = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions()
    .build();

  try {
    // 지정한 url로 접속
    await chrome.get(URL);

    // 특정 요소가 화면에 위치할때까지 최대 5초간 기다려 줌
    await chrome.wait(
      until.elementLocated(
        By.css(".feature_home div:nth-child(3).slide_ranking .tit_item")
      ),
      5000
    );
    await chrome.wait(
      until.elementLocated(
        By.css(
          ".feature_home div:nth-child(3).slide_ranking .txt_num:first-child"
        )
      ),
      5000
    );
    await chrome.wait(
      until.elementLocated(
        By.css(
          ".feature_home div:nth-child(3).slide_ranking .txt_num:last-child"
        )
      ),
      5000
    );

    //접속한 사이트의 html 소스를 가져옴
    const html = await chrome.getPageSource();
    // console.log(html);

    // 페이지소스를 dom 객체로 변환
    const dom = cheerio.load(html);

    // 영화제목들 추출
    let movies = dom(".feature_home div:nth-child(3).slide_ranking .tit_item");
    let rates = dom(
      ".feature_home div:nth-child(3).slide_ranking .txt_num:first-child"
    );
    let reserves = dom(
      ".feature_home div:nth-child(3).slide_ranking .txt_num:last-child"
    );

    // 추출한 결과를 저장하기 위한 배열 선언
    let moviess = [],
      ratess = [],
      rsrvss = [];
    // 추출한 영화제목 출력
    movies.each((idx, movie) => {
      let title = dom(movie).text().trim();
      moviess.push(title);
    });

    // 평점
    rates.each((idx, rate) => {
      let point = dom(rate).text().trim();
      ratess.push(point);
    });

    // 예매율
    reserves.each((idx, rsrv) => {
      let rsrt = dom(rsrv).text().trim();
      rsrvss.push(rsrt);
    });

    // 한번에 모아서 출력
    for (let i = 0; i < moviess.length; ++i) {
      console.log(`${moviess[i]}, ${ratess[i]}, ${rsrvss[i]}`);
    }
  } catch (ex) {
    console.log(ex);
  } finally {
    await chrome.quit(); // 크롬 브라우저 닫기
  }
}

main();
