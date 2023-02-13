// 다음 영화에서 영화정보 크롤링
const cheerio = require("cheerio"); // DOM 라이브러리
// 셀레니움 사용법
// https://www.selenium.dev/documentation/webdriver/getting_started/first_script/
const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

// 비동기 I/O 지원 함수 정의
async function main() {
  // 접속할 url 지정
  const URL = "https://movie.daum.net/main";

  // 크롬 자동화 브라우저 객체 생성
  // Builder 클래스는 WebDriver 객체를 만들기 위한 구성옵션을 제공
  // 구성옵션으로는 브라우저 종류, 브라우저 옵션, 디버깅 정보 등이 있음
  const chrome = await new Builder()
    .forBrowser(Browser.CHROME) // 구성옵션으로서 크롬을 사용
    .setChromeOptions() //   Chrome 브라우저의 옵션 설정
    .build(); // 구성옵션으로 설정한 WebDriver 객체 생성

  try {
    // 지정한 url로 접속
    await chrome.get(URL);

    // 특정 요소가 화면에 로드될 때까지 최대 5초간 기다려 줌
    await chrome.wait(
      until.elementLocated(
        // 특정 요소가 로드될때까지
        // By.css는 셀레니움 WebDriver의 메서드이다
        // 특정 CSS 셀렉터가 적용된 HTML요소를 찾는데 사용함
        By.css(".feature_home .slide_ranking .tit_item")
      ),
      5000
    );

    await chrome.wait(
      until.elementLocated(
        By.css(
          ".feature_home .slide_ranking .txt_num:first-child" // 평점
        )
      ),
      5000
    );

    await chrome.wait(
      until.elementLocated(
        By.css(
          ".feature_home .slide_ranking .txt_num:last-child" // 예매율
        )
      ),
      5000
    );

    // 접속한 사이트의 html 코드를 가져옴
    const html = await chrome.getPageSource();
    // console.log(html);

    // html 코드를 문서객체모델(DOM) 으로 변환
    const dom = cheerio.load(html);
    // console.log(dom);

    // 영화제목들 추출
    // dom(매개변수)로 새로운 cheerio 객체를 생성해서 movies에 할당
    // dom 메서드는 cheerio 객체에서만 사용 가능
    let movies = dom(".feature_home .slide_ranking .tit_item");
    // console.log(movies);
    let rates = dom(".feature_home .slide_ranking .txt_num:first-child");
    let reserves = dom(".feature_home .slide_ranking .txt_num:last-child");

    // 추출한 결과를 저장하기 위한 배열 선언
    // text 메서드는 cheerio 객체에서만 사용가능
    let moviess = [],
      ratess = [],
      rsrvss = [];
    // 추출한 영화제목 출력
    // each는 cheerio 객체에서만 사용 가능
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
