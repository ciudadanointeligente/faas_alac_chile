

function main() {



   var faunadb = require('faunadb'),
     q = faunadb.query;

//AQUI ESTAMOS CREANO E INICIANDO LA BASE DE DATOS QUE USAREMOS
// esta es la clave que utilicé crandola con el nombre "secret" en el link
//https://fauna.com/account/keys
     var adminClient = new faunadb.Client({
       secret: "fnACq-bCJRACAt0VLS0-NeHMK_LgTrGSUw5RPQDG"
     });

//AQUÍ NO REPARÉ EL TEMA DE LA SINCRONIZACIÓ POR LO QUE ES MUY PROBABLE QUE TENGAS QUE EJECUTAR
//2 VECES EL COMANDO "node products.js" la primera vez creará la BD y la segunda vez creará las clases e indices
//de prueba
     adminClient.query(q.CreateDatabase({ name: "my_app" }));

//START Esta parte se debe eliminar luego de que se construya la estructura en fauna DB.
//SI NO SE ELIMINA CREARÁ NUEVAS CLAVES PARA LA BD CADA VEZ QUE SE EJECUTE ESTA SECCIÓN
     var serverKey;
     const promesa =      adminClient.query(
            q.CreateKey(
              { database: q.Database("my_app"), role: "server" }))
            .then(function(key) {
             serverKey = key.secret;
             console.log("la contraseña es:"+ key.secret);
             console.log("....(**).... por favor anotarla ya que con esta se podra ingresar luego");
             console.log("la contraseña es:"+ serverKey);
             return key.secret;
             });
//END Esta parte se debe eliminar luego de que se construya la estructura en fauna DB.

    const promesa2 = promesa.then(function(serverKey){
      console.log("nnnn la contraseña es:"+ serverKey);

      var client = new faunadb.Client({
        //AQUÍ SE DEBE COLOCAR LA CLAVE OBTENIDA EN LA SECCIÓN ANTERIOR
        secret: serverKey //....(**)....
      });

      const promesa3= client.query(q.CreateClass({ name: "posts" })).then(
        function(){
          console.log("hello world acepta porque no ha sido creada la clase posts");
          return "m";}
        ,
        function(){
          console.log("hello world rechaza porque ya está creada la clase posts");
          return "m";}
        );

      const promesa4 = promesa3.then(
        function()
        {
          //EN ESTA SECCIÓN SE CREAN LOS ÍNDICES
            client.query(
              q.CreateIndex(
                {
                  name: "posts_por_TEMA",
                  source: q.Class("posts"),
                  terms: [{ field: ["data", "TEMA"] }]
                }));

            client.query(
              q.CreateIndex(
                {
                  name: "posts_por_tags_con_TEMA",
                  source: q.Class("posts"),
                  terms: [{ field: ["data", "tags"] }],
                  values: [{ field: ["data", "TEMA"] }]
                }));

            client.query(
              q.Create(
                q.Class("posts"),
                { data: { TEMA: "What I had for breakfast .." } }));
        }


      );

    });




    console.log("jjj"+adminClient);

};

main();
