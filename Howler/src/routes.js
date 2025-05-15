const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router();

const fs = require("fs");

var users = require("./data/users.json");
var howls = require("./data/howls.json");
var follows = require("./data/follows.json");

//var howls = howls_orig.sort((a, b) => a.datetime - b.datetime);

howls.sort((a, b) => {

  const nameA = a.datetime.toUpperCase(); // ignore upper and lowercase
  const nameB = b.datetime.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return 1;
  }
  if (nameA > nameB) {
    return -1;
  }

  // names must be equal
  return 0;
});

console.log(howls);

// Middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

let final_str = [];
let curr_userid = 0;
let user_follows = '';
let profile_user_nm = '';

function return_f_howls (useridn, cur_howls_str){

	this_howls = [];
	all_howls = [];
	cur_howls = [];
	cur_howl_items = [];
	
//	console.log(cur_howls_str);
//	cur_howls = cur_howls_str;

	cur_howl_items = cur_howls_str;
	
	for (var j = 0; j < users.length;j++ ) {

//		console.log("In function -- 2d:- in user search > \n" + j + users[j].id);
		if (users[j].id == useridn)
		{
			console.log(users[j].id);
			final_str = JSON.stringify(users[j]);
			break;

		};
	}
	final_usr_str = users[j].id  + '~' + '@' + users[j].username + '~' + users[j].first_name +  '~' + users[j].last_name ;

	for (var i=0; i < howls.length;i++ ) {

		if (howls[i].userId == useridn)
		{
		final_str = final_str + "\n" + i + '----' + howls[i].text;
		howls[i].userstr = final_usr_str;
		cur_howls.push(final_usr_str + '~' + howls[i].datetime + '~' + howls[i].text)
		cur_howl_items.push(howls[i]);

		};
	}
	
	return cur_howl_items;
//	return cur_howls;

}

function return_howls (useridn){

	all_howls = [];
	
	for (var j = 0; j < users.length;j++ ) {

		if (users[j].id == useridn)
		{
			console.log(users[j].id);

			final_str = JSON.stringify(users[j]);
			break;

		};
	}
	
	final_usr_str = users[j].id  + '~' + '@' + users[j].username + '~' + users[j].first_name +  '~' + users[j].last_name ;
	for (var i=0; i < howls.length;i++ ) {

		if (howls[i].userId == useridn)
		{
//		console.log(useridn + "--->" + howls[i].text);
		final_str = final_str + "\n" + i + '----' + howls[i].text;
//		all_howls.push(howls[i].text)
		all_howls.push(final_usr_str + '~' + howls[i].datetime + '~' + howls[i].text);
		};
	}
	let all_howls_str = JSON.stringify(all_howls);

//	console.log("All howls str is --> \n", all_howls_str);
	
	return all_howls_str;

}


router.post('/main', (req, res) => {

	const { username, password } = req.body;

	const html_dir = __dirname;
    
	for (var i=0; i < users.length;i++ ) {

		if (users[i].username == username)
		{
			console.log(users[i].username);
			console.log(users[i].id);
			console.log(users[i]);
			console.log("First looping3 -- " + i + "--" + users.length);

			final_str = JSON.stringify(users[i]);
			curr_userid = users[i].id;
			break;
		};
	}
	user_follows = follows[curr_userid]["following"];
	user_follows.push(curr_userid);
//	console.log("Follows0 users --> " + user_follows + user_follows.length + '-' + user_follows[0] + '-' + user_follows[3]);
//	console.log("Follows users --> " + JSON.parse(JSON.stringify(follows[curr_userid]["following"])));

    res.sendFile('src/templates/main.html', { root: '.' });
    
});

router.get('/api/userinfo/:id', (req, res) => {
   const userid = req.params.id;
     
	for (var i=0; i < users.length;i++ ) {
		console.log("First looping -- " + i + "--" + users.length);
		console.log(users[i].userId);

		if (users[i].id == req.params.id)
		{

			final_str = JSON.stringify(users[i]);
			curr_userid = users[i].id;
			break;
		};
	}
	let f_list = follows[curr_userid].following;
	
	follows_str1 = '';
	follows_cnt = 0;

	f_list.forEach( f_id => {
	
	users.forEach (ele => {if (ele["id"] == f_id) { if (follows_cnt == 0) {apnd = '@'} else {apnd = '|@'}; follows_str1 = follows_str1 + apnd + ele["username"] + " " + ele["first_name"] + " " +  ele["last_name"] }});
	follows_cnt++;
	});
	
	console.log ("--> follows handles concat are " + follows_str1);
	
	let f_list_str = f_list.toString();
	users[i]["follows"] = '';
	users[i]["follows"] = follows_str1;
	console.log("Following list is " + f_list + " ->" + f_list.length);
	res.json(users[i]);	
//  res.json(req.params.id +  users[i].username + users[i].first_name + users[i].last_name);
});

router.get('/api/userinfo', (req, res) => {
   const userid = req.params.id;
   
  res.json(req.params.id);
});


router.get('/api/profile', (req, res) => {

	const userid = req.params.id;

	res.sendFile('src/templates/profile.html', { root: '.' });

});

router.get('/api/profile/:id', (req, res) => {

	const userid = req.params.id;
	let profile_user_nm = req.params.id;;

});

	
//const newdata = [{"id": 123, "name":"ramesh"}];
var new1 = JSON.stringify(users);
const obj1 = JSON.parse(new1);


router.get('/api/data', (req, res) => {
  const data = { name: 'John', age: 30 };
  res.json(data);
});

router.get('/api/userinfo', (req, res) => {

	if (curr_userid == 0) {curr_userid = 10;};

	for (var i=0; i < users.length;i++ ) {
	
	if (users[i].id == curr_userid)
	{
		final_str = JSON.stringify(users[i]);
		curr_userid = users[i].id;
		break;
	};
	}
	console.log("Finalu string is -->\n" + final_str);

//console.log ("In API - json users is - ", users);
  res.json(final_str);
});

let id = 0;
router.get('/api/userinfo/:id', (req, res) => {
   const userid = req.params.id;
   
  res.json(req.params.id);
});

let user_howls = [];


router.get('/api/howls', (req, res) => {

	if (curr_userid == 0) {curr_userid = 10;};
	console.log ("current user124 is ->" + curr_userid);

	for (var i=0; i < howls.length;i++ ) {

		if (howls[i].userId == curr_userid)
		{
		console.log(curr_userid + "--->" + howls[i].text);
		final_str = final_str + "\n" + i + '----' + howls[i].text;
		user_howls.push(howls[i])
		};
	}

    let howls_str = return_howls (curr_userid)
    console.log("Howls returned by function call -->\n", curr_userid + '--->' + howls_str);
  	res.json(howls_str);

});

router.get('/api/howls/:id', (req, res) => {

	const userid = req.params.id;
	let profile_user_nm = req.params.id;;
	
	console.log ("current user124 is ->" + userid);

    let howls_str = return_howls (userid)
    console.log("Howls returned by function call -->\n", curr_userid + '--->' + howls_str);
    
  	res.json(howls_str);

});

/*--
router.post('/api/howls', (req, res) => {

	my_howl_json = {"id":201, "userId": curr_userid, "datetime":"2022-12-01","text": req.body["howl"] };

	howls.pop; howls.pop;
	howls.push(my_howl_json);

	res.sendFile('src/templates/main.html', { root: '.' });

});

--*/

// POST /api/howls
router.post('/api/howls', (req, res) => {
  const newHowl = req.body;
  
  console.log ("---> In post " + JSON.stringify(newHowl));

/*--
  // Validate the incoming data (you can add more validation if needed)
  if (!newHowl.userId || !newHowl.text) {
    res.status(400).json({ error: 'Invalid howl data' });
    return;
  }
--*/
  new_id = howls.length + 1;

  my_howl_json = {"id":new_id, "userId": curr_userid, "datetime":"2022-12-01","text": newHowl["howl"] };
  
  console.log ("---> In post new json " + JSON.stringify(my_howl_json));


  // Assign a new ID to the howl (this is a simple example; you might want to use a more sophisticated ID generation method)

  // Add the new howl to the howls data array
  howls.push(my_howl_json);
  
  console.log ("---> In post new json added " + JSON.stringify(howls));

  

  // Return the created howl with a 201 Created status
//  res.sendFile('src/templates/main.html', { root: '.' });
//    res.sendFile('src/templates/main.html', { root: '.' });

  res.status(201).json(newHowl);
});

router.get('/api/followerhowls', (req, res) => {

	console.log ("followerhowls user123 is ->" + user_follows);
	
	let f_howls_str = '';
	let all_howls = [];

	user_follows.forEach(ele1 => all_howls =  return_f_howls(ele1, all_howls));
	
	console.log ("--> All follower howls are - beg -->");
//	console.log (all_howls);
	console.log ("--> All follower howls are - end -->");


	all_howls.sort((a, b) => {

	  const nameA = a.datetime.toUpperCase(); // ignore upper and lowercase
	  const nameB = b.datetime.toUpperCase(); // ignore upper and lowercase
	  if (nameA < nameB) {
		return 1;
	  }
	  if (nameA > nameB) {
		return -1;
	  }

	  // names must be equal
	  return 0;
	});

	console.log ("--> All follower howls sorted are - beg -->");
//	console.log (all_howls);
	console.log ("--> All follower howls sorted are - end -->");
	
    res.json(JSON.stringify(all_howls));

});

router.get('/', (req, res) => {
  // Return all posts
	res.sendFile('src/templates/login.html', { root: '.' });
//	res.sendFile('templates/form.html', { root: '.' });

});

module.exports = router;
