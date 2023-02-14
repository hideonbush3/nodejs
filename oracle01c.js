// zipcode2013에서 OO시 OO구에 있는 모든 동을 조회하세요
const oracledb = require("oracledb");
async function main() {
  // const sql =
  //   "select distinct dong from zipcode2013" +
  //   "where sido = :1 and gugun = :2 order by dong";
  // let params = ["부산", "해운대구"]; // insert, update, delete, where 절에서 많이 사용(placeholder)

  const sql =
    "select distinct dong from zipcode2013 " +
    "where sido = :sido and gugun = :gugun order by dong";
  let params = { sido: "부산", gugun: "남구" };
  let options = {
    resultSet: true,
    outFormat: oracledb.OUT_FORMAT_OBJECT,
  }; // oracle db를 위한 옵션 정의

  let conn = null;

  try {
    oracledb.initOracleClient({ libDir: "C:/JAVA/instantclient_19_17" });
    conn = await oracledb.getConnection({
      user: "bigdata",
      password: "bigdata",
      connectString: "호스트ip:port/sid",
    });
    console.log("오라클 접속 성공");

    let result = await conn.execute(sql, params, options);
    let rs = result.resultSet;
    let row = null;
    while ((row = await rs.getRow())) {
      console.log(row.DONG);
    }

    rs.close();
  } catch (ex) {
    console.error(ex);
  } finally {
    if (conn) {
      try {
        await conn.close();
        console.log("오라클 데이터베이스 해제!");
      } catch (ex) {
        console.error(ex);
      }
    }
  }
}

main();
