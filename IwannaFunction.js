var GreedyList = {};

function greeting(person) {
  console.log("||From List : greeting function executed");
  console.log(person)
  let out = "Merhabalar hoş geldin";
  if (person != "" && person) {
    console.log('sa')
    out = `Merhaba ${person}`;
  }
  return out;
}
function changeBG(value) {
  console.log("||From List : changeBG function executed");
  console.log(`Renk kodu çalıştırıldı renk:${value}`);
  // document.getElementById("body").style.backgroundColor(value);
}

function IwannaFunction(f, value = "no") {
  let cake;
  switch (f) {
    case "greeting":
      console.log("|greetingcase|");
      cake = greeting(value);
      break;
    case "changeBG":
      cake = changeBG(value);
      break;
    default:
      break;
  }
  return cake;
}

export { IwannaFunction };
