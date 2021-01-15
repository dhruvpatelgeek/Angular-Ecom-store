const { MongoClient, ObjectID } = require('mongodb');	// require the mongodb driver
const { stringify } = require('querystring');
const { v4: uuidv4 } = require('uuid');



/**
 * Description
 * @method Database
 * @param {} mongoUrl
 * @param {} dbName
 * @return 
 */
function Database(mongoUrl, dbName){
	if (!(this instanceof Database)) return new Database(mongoUrl, dbName);
	this.connected = new Promise((resolve, reject) => {
		MongoClient.connect(
			mongoUrl,
			{
				useNewUrlParser: true
			},
			(err, client) => {
				if (err) reject(err);
				else {
					console.log('[MongoClient] Connected to ' + mongoUrl + '/' + dbName);
					resolve(client.db(dbName));
				}
			}
		)
	});
	this.status = () => this.connected.then(
		db => ({ error: null, url: mongoUrl, db: dbName }),
		err => ({ error: err })
	);
}

// get all items 
/**
 * Description
 * @method getItems
 * @return CallExpression
 */
Database.prototype.getItems = function(){
	return this.connected.then(db =>
		new Promise((resolve) => {
			// simply find all items in the store and return the object array
			db.collection('items').find({}).toArray().then((docs) => {
				resolve(docs);
			}).catch((err) => {
				resolve({error:"no items exist"});
			});

		})
	)
}
// get many items with type
/**
 * Description
 * @method itemWithType
 * @param {} type
 * @return CallExpression
 */
Database.prototype.itemWithType = function(type){
	return this.connected.then(db =>
		new Promise((resolve) => {
			db.collection('items').find({"type":type}).toArray().then((docs) => {
				resolve(docs);
			}).catch((err) => {
				resolve({error:"no items exist"+err});
			});

		})
	)
}

// get one item with name
/**
 * Description
 * @method getItemWithId
 * @param {} item_id
 * @return CallExpression
 */
Database.prototype.getItemWithId = function(item_id){
	return this.connected.then(db =>
		new Promise((resolve, reject) => {
		db.collection('item').find({"_id":ObjectID(item_id)}).toArray().then((docs) => {
			if (docs === undefined || docs.length == 0) {
				resolve({error:"no items exist"+404});
			}
			else
			{
				resolve(docs[0]);
			}
		}).catch((err) => {
            resolve({error:"no items exist"+err});
		});
		})
	)
}

//user cart JSON given a username
/**
 * Description
 * @method getcart
 * @param {} salted_uid
 * @return CallExpression
 */
Database.prototype.getcart = function(salted_uid){
	return this.connected.then(db =>
		new Promise((resolve) => {
			// first see if the salted token sent by the client is correct or not
			db.collection('users').find({"user_id":salted_uid}).toArray().then((docs) => {
				// if it is not return an empty object
				if(docs[0]==undefined)
				{
					resolve({
						"cart":"empty",
						"total":0
					   });
				}
				else if(docs[0].cart==undefined)
				{
					resolve({
						"cart":"empty",
						"total":0
					   });
				}
				else
				{ // if the user id i correct
					var promise_arr=[];
					// iterate through his cart 
					//and generate a promise array for all object in the cart
					for(let i=0;i<docs[0].cart.length;i++)
					{	var o_id = new ObjectID(docs[0].cart[i].object_id);
						
						var promise_vector=new Promise((_res)=>{
							db.collection('items').find({_id : o_id}).toArray().then((_docs)=>{
								_res(_docs[0]);
							}).catch((err) => {
								_res({error:err});
							});
							
						})
						promise_arr.push(promise_vector);
					}
					
					// REsolve the resulting array of promises 
					// and return the object list with the total as 
					// an associative array
					Promise.all(promise_arr).then((values) => {
						var total=0;
						for(let i=0;i<values.length;i++)
						{
							total+=values[i].cost;
						}
						console.log("COST IS"+total);
						resolve({
								 "cart":values,
								 "total":total
								});
					  });
				}
				
				
			})
			
		}
	))
}

// post purchase with quantity,item_id
/**
 * Description
 * @method addPurchace
 * @param {} cartObj
 * @return CallExpression
 */
Database.prototype.addPurchace = function(cartObj){
	//var cartObj={
	//	user_id:data_recived.user_id,
	//	object_id:data_recived.object_id_added,
	//	object_id_quantity:data_recived.object_id_added,
	//};
	return this.connected.then(db => 
		new Promise((resolve, reject) => {
			if(cartObj.user_id==undefined)
			{
				reject("NAME NOT DEFINED @ line 96");
			}
			else
			{
				try{
					
					db.collection('users').find({"user_id":cartObj.user_id}).toArray().then((docs) => {
						if (docs === undefined || docs.length == 0) {
							console.log("[234]no USER FOUND WITH ID")
							resolve(false);
						}
						else
						{	var new_item=[{
							"object_id":cartObj.object_id,
							"object_id_quantity":cartObj.object_id_quantity
							 }];
		
							if(Array.isArray(docs[0].cart))
							{
								var temp=docs[0].cart;
								temp.push(new_item[0]);
								new_item=temp;
								console.log(new_item);
							}
							db.collection('users')
							.updateOne(
								{ "user_id": cartObj.user_id}, // Filter
								{$set: {"cart": new_item}}, // Update
							)
							.then((obj) => {
								console.log('Updated - ' + obj);
								resolve(true);
							})
							.catch((err) => {
								console.log('Error: ' + err);
								resolve(false);
							})

							
						}
					}).catch((err) => {
						console.log(err);
						resolve({error:"no items exist"+err});
					});
				}
				catch (error) {
					console.log(error);
					reject(false);
				 }
			}
			
		})
	)
}

// create user
/**
 * Description
 * @method createUser
 * @param {} name
 * @return CallExpression
 */
Database.prototype.createUser = function(name){
	//var cartObj={
	//	user_id:data_recived.user_id,
	//	object_id:data_recived.object_id_added,
	//	object_id_quantity:data_recived.object_id_added,
	//};
	return this.connected.then(db => 
		new Promise((resolve, reject) => {
			if(name==undefined)
			{
				console.log('no name entered[323]');
				resolve(0);
			}
			else
			{
				try{
					var time =new Date().toISOString();
					var uid=uuidv4()+"-"+time+"-"+name;
					console.log(uid);
					db.collection('users')
							.insertOne(
								{ "user_id": uid} // inserting a new user 
								)
							.then((obj) => {
								resolve(obj.ops[0].user_id);
							})
							.catch((err) => {
								console.log('Error: ' + err);
								resolve(0);
							})
					
				}
				catch (error) {
					console.log(error);
					reject(false);
				 }
			}
			
		})
	)
}

module.exports = Database;