

const request = require("request")
const fs = require("fs")


let args = process.argv.splice(2)

let url = args[0]
let fileSavePath = args[1]

request(`${url}`, (error, response, body) => {

  if (error) {
    console.log(`error. ${url} is invalid`, error)
    process.exit()
  }

  fs.writeFile(`${fileSavePath}`, body, err => {
    if (err) {
      console.error(`error: file path invalid \n ${err}`);
      process.exit()
    }
    // file written successfully
  });
});