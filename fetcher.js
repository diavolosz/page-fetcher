

const request = require("request")
const fs = require("fs")
const readline = require("readline");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let args = process.argv.splice(2)

let url = args[0]
let fileSavePath = args[1]

request(`${url}`, (error, response, body) => {

  if (error) {
    console.log(`error. ${url} is invalid`, error)
    process.exit()
  }

  if (fs.existsSync(`${fileSavePath}`)) {
    rl.question("Woud you like to overwrite? Y or N      ", (key) => {
      if (key === "n" || key === "N") {
        console.log("File path exists:", `${fileSavePath}`);
        rl.close ()
      } else if ((key === "y" || key === "Y")){
        fs.writeFile(`${fileSavePath}`, body, err => {
          if (err) {
            console.error(`error: file path invalid \n ${err}`);
            process.exit()
          } 
          // file written successfully
          console.log(`Overwritten files at ${fileSavePath}`)
          rl.close()
        });
      }
    })
  }

  if (!fs.existsSync(`${fileSavePath}`)) {
    fs.writeFile(`${fileSavePath}`, body, err => {
      if (err) {
        console.error(`error: file path invalid \n ${err}`);
        process.exit()
      } 
      // file written successfully
      console.log(`New file created at ${fileSavePath}`)
      process.exit()
    });
  }

  rl.on("close", function() {
    console.log("BYE BYE !!!");
    process.exit(0);
  });
});