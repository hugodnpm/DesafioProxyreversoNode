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
const connect = mysql.createConnection(config);
const sql = `INSERT INTO people(name) values('Hugo Carvalho')`;
connect.query(sql);

app.get("/", (req, res) => {
  const conn = mysql.createConnection(config);
  conn.query("SELECT * FROM people", (error, results, fields) => {
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

    res.send(result);
  });
  connect.end();
});
app.listen(port, () => {
  console.log(`Rodando na porta => ${port}`);
});
