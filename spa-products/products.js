
function main(params) {
var vari =   {
      "id": 1,
      "name": "Sony Xperia Z3",
      "price": 899,
      "specs": {
        "manufacturer": "Sony",
        "storage": 16,
        "os": "Android",
        "camera": 15
      },
      "description": "Lorem ipsum dolor sito. Etiam eget tellus arcu.",
      "rating": 4,
      "image": {
        "small": "assets/images/sony-xperia-z3.jpg",
        "large": "assets/images/sony-xperia-z3-large.jpg"
      }
    } ;

return {
  headers: {"Content-Type": "application/json; charset=utf-8"},
  statusCode: 200,
  body: vari};

}
