const mariadb = require("mariadb");
const dbconfig = require("./dbconfig2.js");

async function main() {
  const sql =
    "select distinct dong from zipcode2013 " +
      "where sido = ? and gugun = ? order by dong";
  let params = ["부산", "남구"];
  let conn = null;

  try {
    conn = await mariadb.createConnection(dbconfig);

    let result = await conn.execute(sql, params);
    // console.log(result);

    for (let row of result) {
      console.log(row.dong);
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
