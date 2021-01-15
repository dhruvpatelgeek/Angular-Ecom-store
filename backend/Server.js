var mongoUrl = "mongodb://localhost:27017";
var mongoName = "demo";
var Database = require("./Database.js");
var db = new Database(mongoUrl, mongoName);


const express = require('express')
const app = express()
const port = 3000// change for deployment

const bodyParser = require('body-parser'); // to retrive the cart object


// loading the body parser
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
  }));

  // allow access form any HOST
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next(); // Important
})

// API POST point for pushing an item into the cart for a user
  app.post('/addtocart',(req,res)=>{
	var data_recived=req.body;
	console.log(data_recived);
	if(req==null)
	{
		res.status(400);
		res.send("ERROR a request not formated properly");
	}
	else if(req.body===undefined)
	{
		res.status(400);
		console.log(data_recived+ " b error");
		res.send("ERROR b request not formated properly");
	}
	else if(data_recived.user_id===undefined)
	{
		res.status(400);
		res.send("ERROR c request not formated properly");
	}
	else
	{
		
		var cartObj={
			user_id:data_recived.user_id,
			object_id:data_recived.object_id,
			object_id_quantity:data_recived.object_id_quantity
		};
	
		

		var promise_ret=db.addPurchace(cartObj);
			promise_ret.then(
				(result)=>{
					console.log("PUSED VIA POST"+result)
					res.status(200);
					res.send(true);
				},
				(error)=>{
					console.log("POST ERROR "+error);
					res.status(200);
					res.send(false);
				}
			)
		}
})
// API POST point for authentication
app.post('/createuser/:name',(req,res)=>{
	var data_recived=req.params.name;
	console.log(data_recived);
	if(req==null)
	{
		res.status(400);
		res.send("ERROR a request not formated properly");
	}
	else if(req.body===undefined)
	{
		res.status(400);
		console.log(data_recived+ " b error");
		res.send("ERROR b request not formated properly");
	}
	else if(data_recived===undefined)
	{
		res.status(400);
		res.send("ERROR c request not formated properly");
	}
	else
	{
		
		var promise_ret=db.createUser(data_recived);
			promise_ret.then(
				(result)=>{
					console.log("PUSED VIA POST"+result)
					res.status(200);
					res.send({token:result});
				},
				(error)=>{
					console.log("POST ERROR "+error);
					res.status(200);
					res.send({token:"null"});
				}
			)
		}
})

// API get point retriving the item catalog
app.get('/cat/:itemType',(req,res)=>{
    if(req.params.itemType=="all")
    {
        var promise_ret=db.getItems();
	    promise_ret.then(
	    (result)=>{
	    	res.status(200);
	    	res.send(result);
	    },
	    (error)=>{
	    	res.status(404);
	    	res.send("error of 8909 "+error);
	    }
	    ).catch((error)=>{
	    	res.status(404);
	    	res.send("ERROR 443"+error);
	    })
    }
    else
    {
        var promise_ret=db.itemWithType(req.params.itemType);
	    promise_ret.then(
	    (result)=>{
	    	res.status(200);
	    	res.send(result);
	    },
	    (error)=>{
	    	res.status(404);
	    	res.send("error of 8909 "+error);
	    }
	    ).catch((error)=>{
	    	res.status(404);
	    	res.send("ERROR 443"+error);
	    })
    }
	
})

// API get point retriving the cart
app.get('/getcart/:salted_uid',(req,res)=>{
    if(req.params.salted_uid==undefined)
    {
	    res.status(400);
	    res.send("error of 8909 uid not DEFINED"+error);
    }
    else
    {
        var promise_ret=db.getcart(req.params.salted_uid);
	    promise_ret.then(
	    (result)=>{
	    	res.status(200);
	    	res.send(result);
	    },
	    (error)=>{
	    	res.status(404);
	    	res.send("error of 8909 "+error);
	    }
	    ).catch((error)=>{
	    	res.status(404);
	    	res.send("ERROR 443"+error);
	    })
    }
	
})






app.get('/', (req, res) => {
    res.send('SPARTAN STORE FRONT REST API')
  })


app.listen(port, () => {
  console.log(`app listening at ${port}`)
})