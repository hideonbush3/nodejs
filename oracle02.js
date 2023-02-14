const oracledb = require("oracledb");
const dbconfig = require("./dbconfig.js"); // db연결정보 파일

async function main() {
  let sql1 =
    "create table sungjuk (name varchar(100), kor number(3), eng number(3), mat number(3))";
  let sql2 = "insert into sungjuk values (:1, :2, :3, :4)";
  let sql3 = "update sungjuk set kor =:1, eng= :2, mat =:3 where name = :4 ";
  let sql4 = "delete from sungjuk where name = :1";
  let sql5 = "select * from sungjuk";
  let params = [];
  let options = {
    resultSet: true,
    outFormat: oracledb.OUT_FORMAT_OBJECT,
  }; // oracle db를 위한 옵션 정의

  let conn = null;

  try {
    oracledb.initOracleClient({ libDir: "C:/JAVA/instantclient_19_17" });
    conn = await oracledb.getConnection(dbconfig);

    // await conn.execute(sql1);

    params = ["남궁성", 80, 90, 100];
    let result = await conn.execute(sql2, params);
    await conn.commit();    // insert 할때 반드시 필요!

    // params = [10, 20, 30, "남궁성"];
    // let result = await conn.execute(sql3, params);
    // await conn.commit();

    // params = ["남궁성"];
    // let result = await conn.execute(sql4, params);
    // await conn.commit();

    result = await conn.execute(sql5);

    console.log(result);
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
