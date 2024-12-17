import nlp from "compromise";

function getColors(message) {
  const colorList = [
    "red",
    "green",
    "blue",
    "yellow",
    "pink",
    "purple",
    "orange",
    "brown",
    "black",
    "white",
    "gray",
    "violet",
  ];

  let foundColors = colorList.filter((color) =>
    message.toLowerCase().includes(color)
  );

  return foundColors.length > 0 ? foundColors.join(", ") : null;
}



function ravelValue(message, tag) {
  console.log(` TAG: ${tag}`)
  let doc = nlp(message);
  let value = doc.match(tag);

  console.log(`|| ${value.text()}`)
  return value.text() || null;
}
function ValueChaser(message, tag) {
  console.log("chasing start");
  let jump = null;
  switch (tag) {
    case "#Color":
      console.log(`case: #Color message: ${message}`);
      jump = getColors(message);
      break;
    default:
      console.log(`case: default`);
      jump = ravelValue(message, tag);
      break;
  }

  console.log(`Chasing end. Kazınan değer ${jump}`);
  return jump;
}

export { ValueChaser };
