const express = require("express");
const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);
const sql = `INSERT INTO people(name) values('Hugo')`;
const findAll = `SELECT * FROM people LIMIT 10`;

const executeSQL = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        results = JSON.parse(JSON.stringify(results));
        const result = `
      <div>
        <h1>Full Cycle Rocks!</h1>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            ${results
              .map(
                (row) =>
                  `<tr>
                    <td>${row.name}</td>
                  </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;

        resolve(result);
      }
      connection.end();
    });
  });
};
app.get("/", async (req, res) => {
  const result = await executeSQL(findAll);

  res.send(result);
});

app.listen(port, () => {
  console.log(`Rodando na porta => ${port}`);
});
