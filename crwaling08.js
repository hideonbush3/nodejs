// 셀레니엄을 이용해서 k-apt.go.kr에서
// 2023년 1월, 서울특별시, 강남구, 삼성동, 아이파크삼성 apt의
// 지상/지하 주차장 대수 추출

const {
  Builder,
  Browser,
  By,
  Key,
  until,
  Select,
} = require("selenium-webdriver");

async function main() {
  const URL = "http://www.k-apt.go.kr/";

  const chrome = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    await chrome.get(URL);

    // 우리단지 기본정보 버튼이 표시될때까지 5초 대기
    await chrome.wait(until.elementLocated(By.css("ul.wp220 li a")));
    await chrome.sleep(1000);

    // 단지정보 버튼 클릭
    // let menu = await chrome.findElement(
    //     By.css("#nav > ul > li:nth-child(1) > a")
    // );
    let menu = await chrome.findElement(
      By.xpath('//a[@title="단지정보"]') // '/a'는 모든 a태그란 뜻 '@'는 속성이라는 뜻
    );
    await chrome.actions().move({ origin: menu }).click().perform();
    await chrome.sleep(500);

    // 우리단지 기본정보 버튼 클릭
    // const info = await chrome.findElement(By.css(".wp220 li:first-child a"));
    let info = await chrome.findElement(
      By.xpath('//a[@title="우리단지 기본정보"]')
    );
    await chrome.actions().move({ origin: info }).click().perform();
    await chrome.sleep(500);

    // ------------------------------
    // 검색할 아파트를 변수로 선언
    let syear = "2023년";
    let smonth = "01월";
    let sido = "서울특별시";
    let gugun = "강남구";
    let dong = "삼성동";
    let apt = "삼성홍실";

    // 검색년도 값 설정
    // select변수에 할당된 HTML 요소(select태그)를 가져와서
    // Select 객체를 생성하고 selectByVisibleText 메서드를
    // 사용하여 선택자의 표시되는 텍스트와 일치하는 옵션을 선택
    // 즉 selectByVisibleText 메서드를 사용하기 위해
    // select 태그를 가져와 Select 객체를 생성한 것
    let select = await chrome.findElement(By.name("searchYYYY"));
    await new Select(select).selectByVisibleText(syear);
    await sleep(300);

    // 검색 월 값 설정
    select = await chrome.findElement(By.name("searchMM"));
    await new Select(select).selectByVisibleText(smonth);
    await sleep(300);

    // 검색 시도 값 설정
    select = await chrome.findElement(By.name("combo_SIDO"));
    await new Select(select).selectByVisibleText(sido);
    await sleep(300);

    // 검색 구군 값 설정
    select = await chrome.findElement(By.name("combo_SGG"));
    await new Select(select).selectByVisibleText(gugun);
    await sleep(300);

    // 검색 동 값 설정
    select = await chrome.findElement(By.name("combo_EMD"));
    await new Select(select).selectByVisibleText(dong);
    await sleep(300);

    // 검색결과 출력 - 아파트명, 주소
    let apts = await chrome.findElements(By.css(".aptS_rLName"));
    for (let apt of apts) {
      console.log(await apt.getAttribute("textContent"));
    }
    let aptaddrs = await chrome.findElements(By.css(".aptS_rLAdd"));
    for (let addr of aptaddrs) {
      console.log(await addr.getAttribute("textContent"));
    }
    await chrome.sleep(1000);

    // 삼성홍실 항목(apt)을 찾아 인덱스 값 추출
    let idx = 0;
    for (let val of apts) {
      console.log(`${idx++} ${await val.getAttribute("textContent")}`);
      if ((await val.getAttribute("textContent")) == apt) break;
    }

    // 추출한 인덱스값을 이용해서 아파트 항목 직접 클릭
    menu = await chrome.findElement(
      By.css(`.mCSB_container ul li:nth-child(${idx}) a`)
    );

    await chrome.actions().move({ origin: menu }).click().perform();

    // await chrome.executeScript(
    //     'arguments[0].click();', apts[--idx]);
    await chrome.sleep(1000);

    // ----------------------------
    // 관리시설 정보 클릭
    let danzee = await chrome.findElement(
      By.xpath('//*[@id="container"]/div[2]/div[1]/ul/li[3]/a')
    );
    await chrome.actions().move({ origin: danzee }).click().perform();
    await chrome.sleep(1000);

    let pcnt = await chrome.findElement(By.css("#kaptd_pcnt")).getText();
    let pcntu = await chrome.findElement(By.css("#kaptd_pcntu")).getText();
    let tpcnt = await chrome.findElement(By.css("#kaptd_total_pcnt")).getText();
    console.log(await pcnt, await pcntu, await tpcnt);
  } catch (ex) {
    console.log(ex);
  } finally {
    await chrome.sleep(1000);
    await chrome.quit();
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

main();
