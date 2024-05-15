// import the http module
const http = require('http');

// create a jokes database of array objects
let db = [
    {
        id: 0,
        title: "You are the ; to my statements",
        comedian: "Alice Johnson",
        year: 2015
    },

    {
        id: 1,
        title: "Why did the programmer quit her job? Because she didn’t get arrays",
        comedian: "Bob Smith",
        year: 2018
    },
    {
        id: 2,
        title: "What did the Java Code say to the C code? You’ve got no class",
        comedian: "Charlie Brown",
        year: 2020
    },

    {
        id: 3,
        title: "A programmer puts two glasses on his bedside table before going to sleep. A full one, in case he gets thirsty, and an empty one, in case he doesn’t",
        comedian: "Daisy Lee",
        year: 2019
    },

    {
        id: 4,
        title: "Why do programmers prefer dark mode? Because light attracts bugs.",
        comedian: "Eddie Rodriguez",
        year: 2021
    },

    {
        id: 5,
        title: "Things aren’t always #000000 and #FFFFFF",
        comedian: "Fiona Clark",
        year: 2017
    },

    {
        id: 6,
        title: "Why do Java programmers have to wear glasses? Because they don’t C#",
        comedian: "George Evans",
        year: 2016
    },

    {
        id: 7,
        title: "A programmer is heading out to the grocery store, so his wife tells him “get a gallon of milk, and if they have eggs, get a dozen.” He returns with 13 gallons of milk.",
        comedian: "Hannah Miller",
        year: 2014
    },

    {
        id: 8,
        title: "Programmer: An organism that turns coffee into software",
        comedian: "Ian Thompson",
        year: 2013
    }
];

  

function requestHandler(req, res){

    // handle get requests
    if (req.url === '/' && req.method === 'GET'){

        res.writeHead(200, {'Content-Type':'Application/Json'})
     
        res.end(JSON.stringify(db))
    }
    
    // handle post requests
    if (req.url === '/' && req.method === 'POST'){

            let body = [];

            // handle data stream event
            req.on('data', (chunk) => {

                // push chunks of binary data into body array
                body.push(chunk)

            })

            // start a data stream event on the POST request
            req.on('end', () => {

                // at end of data stream event, convert concatenate binary data streams 
                // and convert it to a string
                let convertedBuffer = Buffer.concat(body).toString();

                // parse the string data to JSON type for integration into the database
                let jsonRes =JSON.parse(convertedBuffer)

                //push the JSON data into the database to update it with a new entry as the new database
                db.push(jsonRes)

                // return a status code
                res.writeHead(201)

                //return the updated database as the response
                res.end(JSON.stringify({'db': db}))
            })

    }

    // handle patch request
    if (req.url === '/joke/1' && req.method === 'PATCH') {

        // get the id url parameter
        const id = +req.url.split('/')[2]

        let body = [];

            req.on('data', (chunk) => {

                body.push(chunk)

            })

            req.on('end', () => {

                let convertedBuffer = Buffer.concat(body).toString();
                let jsonRes =JSON.parse(convertedBuffer)

                // map data from request body to database item using the id and spread the data values into it
                //using the spread operator `...`
                let updateDB = db.map((item) => {
                    if (item.id === id){
                        return {
                                    ...item,
                                    ...jsonRes,
                                }
                    }

                    return item;
                })

                // update database with the new returned modified database entries
                db = updateDB;

                res.writeHead(201)

                // return the updated database as a response
                res.end(JSON.stringify(db));
            })
        
    }

    if (req.url === '/joke/1' && req.method === 'DELETE'){

        const id = +req.url.split('/')[2];

        const index = db.findIndex((item) => {
            return item.id === id
        });

        if (index !== -1){
            const deletedItem = db.splice(index, 1);

            res.writeHead(200);

            res.end(JSON.stringify(deletedItem));

        } else {

            res.writeHead(404, {'Content-Type': 'text/plain'})
            res.end("Joke Not Found");
        }

    } 

}




const server = http.createServer(requestHandler)

server.listen(4000, () => {

    console.log("Server is listening")

})