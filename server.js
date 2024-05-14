const http = require('http');


let db = [
            {
                "id": "0",
                "joke": "You are the ; to my statements",
                "author": "Alice Johnson"
            },

            {
                "id": "1",
                "joke": "Why did the programmer quit her job? Because she didn’t get arrays",
                "author": "Bob Smith"
            },

            {
                "id": "2",
                "joke": "What did the Java Code say to the C code? You’ve got no class",
                "author": "Charlie Brown"
            },

            {
                "id": "3",
                "joke": "A programmer puts two glasses on his bedside table before going to sleep. A full one, in case he gets thirsty, and an empty one, in case he doesn’t",
                "author": "Daisy Lee"
            },

            {
                "id": "4",
                "joke": "Why do programmers prefer dark mode? Because light attracts bugs.",
                "author": "Eddie Rodriguez"
            },


            {
                "id": "5",
                "joke": "Things aren’t always #000000 and #FFFFFF",
                "author": "Fiona Clark"
            },


            {
                "id": "6",
                "joke": "Why do Java programmers have to wear glasses? Because they don’t C#",
                "author": "George Evans"
            },

            {
                "id": "7",
                "joke": "A programmer is heading out to the grocery store, so his wife tells him “get a gallon of milk, and if they have eggs, get a dozen.” He returns with 13 gallons of milk.",
                "author": "Hannah Miller"
            },

            {
                "id": "8",
                "joke": "Programmer: An organism that turns coffee into software",
                "author": "Ian Thompson"
            }
        ]
  

function requestHandler(req, res){
    if (req.url === '/' && req.method === 'GET'){

        res.writeHead(200, {'Content-Type':'Application/Json'})
     
        res.end(JSON.stringify(db))
    }
    
    if (req.url === '/' && req.method === 'POST'){
            let body = [];

            req.on('data', (chunk) => {

                body.push(chunk)

            })

            req.on('end', () => {

                let convertedBuffer = Buffer.concat(body).toString();
                let jsonRes =JSON.parse(convertedBuffer)
                db.push(jsonRes)
                res.writeHead(201)
                res.end(JSON.stringify({'db': db, "message":"database updated successfully"}))
            })

    }
}









const server = http.createServer(requestHandler)

server.listen(4000, () => {

    console.log("Server is listening")

})