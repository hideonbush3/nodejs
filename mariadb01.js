// mariaDB는  오라클처럼 인스턴트 클라이언트 라이브러리가 필요없다
// 그리고 db 연결 객체를 execute(실행)할때 options가 필요없지만
// 실행결과 자체에 테이블의 필드들이 객체 하나하나로 들어가있어서
// 오라클처럼 결과집합으로 변환하고 또 그것을 getRow() 메서드로
// 호출해야하는 번거러움이 덜하다
// db 연결 객체를 생성할때 오라클의 경우와 메서드명이 다른것과
// 파라미터값이 다른다는 것만 눈여겨보면 된다
const mariadb = require("mariadb");
const dbconfig = require("./dbconfig2.js");

async function main() {
  const sql = "select distinct sido from zipcode2013";
  let conn = null;

  try {
    conn = await mariadb.createConnection(dbconfig);

    let result = await conn.execute(sql);
    // console.log(result);  // sql 실행결과에 이미 필드들이 각각의 객체형태로 배열안에 들어가있음

    // 그러므로 반복문으로 곧바로 출력가능
    for (let row of result) {
      console.log(row.sido); // 오라클의 경우였으면 row.SIDO
    }
  } catch (ex) {
    console.error(ex);
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (ex) {
        console.error(ex);
      }
    }
  }
}

main();
