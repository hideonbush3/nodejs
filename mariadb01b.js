const mariadb = require("mariadb");
const dbconfig = require("./dbconfig2.js");

async function main() {
  // const sql = "select distinct gugun from zipcode2013 where sido = ?";
  // const params = ['부산'];

  const sql = "select distinct gugun from zipcode2013 where sido = :sido";
  const params = { sido: "부산" };
  let conn = null;

  try {
    conn = await mariadb.createConnection(dbconfig);

    // let result = await conn.execute(sql, params);  // sql ? 형식

    let result = await conn.execute(
      // sql :컬럼명 형식
      {
        namedPlaceholders: true,
        sql: sql,
      },
      params
    );

    for (let row of result) {
      console.log(row.gugun);
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
