// 셀레니엄을 이용해서 네이버의 받은 메일개수 조회 후 출력
// https://www.naver.com/

const {
  Builder,
  Browser,
  By,
  Key,
  until,
  Select,
} = require("selenium-webdriver");
const ncp = require("copy-paste");

async function main() {
  const URL = "https://www.naver.com/";

  const chrome = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    // 사이트 접속
    await chrome.get(URL);

    // 로그인 버튼이 제대로 나탈날때까지 최대 5초까지 대기
    await chrome.wait(until.elementLocated(By.css(".link_login")), 5000);

    // 로그인 버튼을 찾아서 클릭
    let loginbtn = await chrome.findElement(By.css(".link_login"));
    await chrome.actions().move({ origin: loginbtn }).click().perform();
    sleep(1000); // 1초동안 잠시 대기

    // ----------------------------------
    await chrome.wait(until.elementLocated(By.css(".btn_login")), 5000);

    const uid = await chrome.findElement(By.css("#id"));
    const pwd = await chrome.findElement(By.css("#pw"));
    loginbtn = await chrome.findElement(By.css(".btn_login"));

    // 네이버에서는 이러한 행위를 봇으로 인식 -> 2차 인증 필요
    // await chrome.actions().sendKeys(uid, "ppoii0961").perform();
    // sleep(2000);
    // await chrome.actions().sendKeys(pwd, "qwe0961!").perform();
    // sleep(2000);

    // 아이디/비밀번호를 클립보드로 복붙 후 로그인 시도
    // 클립보드 복사 모듈 : copy-paste
    ncp.copy("ppoii0961");
    await chrome
      .actions()
      .click(uid)
      .keyDown(Key.CONTROL)
      .sendKeys("v")
      .perform();
    await chrome.sleep(2000);

    ncp.copy("비밀번호입력칸");
    await chrome
      .actions()
      .click(pwd)
      .keyDown(Key.CONTROL)
      .sendKeys("v")
      .perform();
    await chrome.sleep(2000);

    await uid.submit();

    await chrome.actions().move({ origin: loginbtn }).click().perform();
    await chrome.sleep(2000);

    // ----------------------

  } catch (ex) {
    console.log(ex);
  } finally {
    await chrome.sleep(5000);
    await chrome.quit();
  }
}

// 일정시간 셀리니움이 대기하는 함수
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

main();
