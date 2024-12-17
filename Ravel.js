import nlp from "compromise";

import readline from "readline";
import { ValueChaser } from "./Valuechaser.js";
import { IwannaFunction } from "./IwannaFunction.js";
import { exit } from "process";
import { readFile } from "fs";

// readline arayüzü oluşturuluyor
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var intents = [
  {
    intent: "Draw screen",
    form: "#Color",
    value: null,
    IwantValue: "yes",
    function: "changeBG",
    execute: "now",
    workload: "tweaktool",
  },
  {
    intent: "Merhaba",
    form: "#Greeting",
    value: "Hello World",
    IwantValue: "no",
    function: "greeting",
    execute: "now",
    workload: "conversation",
  },
  {
    intent: "Para yatır",
    form: "#Money",
    value: null,
    IwantValue: "yes",
    function: "deposit_money",
    execute: "now",
    workload: "tweaktool",
  },
  {
    intent: "Para çek",
    form: "#Money",
    value: null,
    IwantValue: "yes",
    function: "withdraw_money",
    execute: "now",
    workload: "tweaktool",
  },
  {
    intent: "Saat Kaç",
    form: "#Time",
    value: null,
    IwantValue: "no",
    function: "getClock",
    execute: "now",
    workload: "conversation",
  },
  {
    intent: "Tarih ne",
    form: "#Date",
    value: null,
    IwantValue: "yes",
    function: "getDate",
    execute: "now",
    workload: "conversation",
  },
  {
    intent: "My name is",
    form: "#Person",
    value: null,
    IwantValue: "yes",
    function: "greeting",
    execute: "now",
    workload: "conversation",
  },
];

function getIntent(intent) {
  return intents.find((e) => e.intent == intent);
}

const usermesaji = "sa";
function IneedValue(form, input, info = "sasa") {
  console.log(form);
  console.log(info);
  console.log(input);
  if (input == "$exit") {
    return "IwannaQuit";
  } else if (IsValueGood(input, form) == "yes") {
    console.log(` Input değerİ :${input}`);
    return input;
  } else if (IsValueGood(input, form) == "no") {
    input = "blue";
    console.log(` Input değerİ :${input}`);
    IneedValue(form, input, "Değer geçersiz tkr dene ya da $exit yaz");
  }
  return;
}

function IsValueGood(value, form) {
  let doc = nlp(value);
  let jsonOutput = doc.out("json");
  let isValid = "no";

  jsonOutput[0].terms.forEach((term) => {
    if (term.tags.includes(form)) {
      isValid = "yes";
    }
  });

  return isValid;
}

function StarvingCheckPoint(moment) {
  if (moment == "reset") {
    console.log(`reTurned ${moment} 'moment`);
  }
}

function enforce(message) {
  console.log(`Enforce started with message: ${message} `);
  var doc = nlp(message);
  var intent = ravelIntent(doc);
  if (intent) {
    let obj = getIntent(intent);
    if (obj.IwantValue == "yes") {
      let value = ValueChaser(message, obj.form);
      console.log(`Değer ${value}`);
      if (!value) {
        let value = IneedValue(obj.form, "IwannaQuit", "merhaba");
        if (value == "IwannaQuit") {
          console.log("< I want quit step >");
          console.log("Çıkıldı");
          StarvingCheckPoint("reset");
          return;
        }
        console.log("< IneedValue after execute >");
        Execute(value, obj.intent);
      } else {
        console.log("< Value already exixst so execute>");
        Execute(value, obj.intent);
      }
    } else if (obj.IwantValue == "no") {
      console.log("<Executing functions that do not require a value >");
      let value = null;
      Execute(value, obj.intent);
      exit(0);
    }
    console.log("DIFFERENT");
    exit(0);
  } else {
    console.log("I dont understand you");
    return;
  }
}
const intentsList = intents.map((intentObject) => intentObject.intent);
function ravelIntent(doc) {
  for (let intent of intentsList) {
    if (doc.has(intent)) {
      console.log(`Intent detected ${intent}`);
      return intent;
    }
  }
  return null;
}

function Execute(value, intent) {
  console.log(intent);
  var obj = getIntent(intent);
  console.log(obj.intent);
  if (obj.execute == "now") {
    if (obj.workload == "conversation") {
      //These funcsiton's just send a message for conversation
      console.log(`Send this message: ${IwannaFunction(obj.function, value)}`);
    } else if ((obj.workload = "tweaktool")) {
      console.log("tweak");
      //These section's functions make complex process or client side tweaks.
    }
  }
  // execute or send to client OR you can send this func  with intent obj and execute inside of client
  console.log(`Fonksiyon execute edildi \{ ${obj.function} \}  \{ ${value} \} \{ "execute:"${obj.execute} \} \{ "workload:"${obj.workload} \}`);
}
function Ravel(message) {
  console.log(`Enforce started with message: ${message} `);
  var doc = nlp(message);
  var intent = ravelIntent(doc);
  if (intent) {
    let obj = getIntent(intent);
    if (obj.IwantValue == "yes") {
      let value = ValueChaser(message, obj.form);
      console.log(`Değer ${value}`);
      if (!value) {
        let value = IneedValue(obj.form, "IwannaQuit", "merhaba");
        if (value == "IwannaQuit") {
          console.log("< I want quit step >");
          console.log("Çıkıldı");
          StarvingCheckPoint("reset");
          return;
        }
        console.log("< IneedValue after execute >");
        return { value, intent: obj.intent };
      } else {
        console.log("< Value already exixst so execute>");
        return { value, intent: obj.intent };
      }
    } else if (obj.IwantValue == "no") {
      console.log("<Executing functions that do not require a value >");
      let value = null;
      return { value, intent: obj.intent };
    }
    console.log("DIFFERENT");
    exit(0);
  } else {
    console.log("I dont understand you");
    return;
  }
}

var msj;
msj = "Para çek 12$";
// msj = "Para yatır 12$";
// msj = "draw screen red";
// msj = "Saat kaç";
// msj = "My name is john ";
// msj = "Merhaba";
 enforce(msj);


export { Ravel , Execute};

