
console.log ("Entering home.js ");

let userid = 12;
let parm_userid = 17;
// app.use(express.static('static'));
const data = {name: "John doe", email: "test@exampl.com"};

const options = {

	method : "POST",
	headers: {"Content-Type": "application/json"},
	body: JSON.stringify(data)
};


function func_click () {

	console.log("I am in p1 function div clicked");
};


fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

let final_str = '';
fetch('/api/userinfo')
  .then(response => response.json())
  .then(data => {
    console.log ("I am in user - client ");
    console.log(data);
    console.log(JSON.parse(data));
    let user_json = JSON.parse(data);

    console.log(JSON.stringify(data));
    
	console.log("UserDisp -->" + JSON.parse(data)["id"] + user_json["first_name"] + user_json["last_name"] );

        const heading = document.querySelector('p');
        heading.textContent = user_json["first_name"] + ' ' + user_json["last_name"] ;
  })
  .catch(error => console.error(error));


let howl_cnt = 0;  
let howl_ary1 = [];
let howl_var = '';


let comp_ary1 = [];
fetch('/api/followerhowls')
  .then(response => response.json())
  .then(data => {

    console.log(data);

	let ary_howls = JSON.parse(data);
	
	console.log("Before printing all follower howls\n");
	console.log(ary_howls);
	console.log("After printing all follower howls\n");

	let ele_id_nm = '';

	let new_var = '';
		
	let para2 = '';
	for (var i=0; i < ary_howls.length;i++ ) {
	    ele_id_nm = 'p' + (howl_cnt + i +1);
	    console.log(ele_id_nm);
        para2 = document.getElementById(ele_id_nm);
        
        comp_ary1 = ary_howls[i]["userstr"].split('~');
        
		new_var = comp_ary1[2] + ' ' + comp_ary1[3] + ' ' + comp_ary1[1] + '\t\t\t\t' + ary_howls[i]["datetime"] + '\n' + ary_howls[i]["text"];

		console.log(new_var);

		para2.textContent = new_var;
		console.log("I am follower clickable --> id is " + comp_ary1[0]);
		const parm_val = comp_ary1[0];

		para2.addEventListener("click", function( ) {
		console.log("I am clickable1 --> id is " + comp_ary1[0] + parm_val);

		fetch("/api/profile/", options)
		.then(response => window.location = "/api/profile/?id=" + parm_val)
		.then(data => console.log ("I am in post user - client "))
		.catch(error => console.error(error));

		});

 
	}

  })
  .catch(error => console.error(error));
  

fetch('/api/userinfo/26')
  .then(response => response.json())
  .then(data => {
    console.log ("I am in user - client ");
    console.log(data);
    console.log(JSON.parse(data));
    let user_json = JSON.parse(data);

    console.log(JSON.stringify(data));
    
	console.log("UserDisp -->" + JSON.parse(data)["id"] + user_json["first_name"] + user_json["last_name"] );

    let string1 = JSON.stringify(data);
        const heading = document.querySelector('p');
        heading.textContent = user_json["first_name"] + ' ' + user_json["last_name"] ;
    // Do something with the JSON data
  })
  .catch(error => console.error(error));


function fetch_userinfo () {

fetch('/api/userinfo')
  .then(response => response.json())
  .then(data => {
    console.log ("I am in user - client ");
    console.log(data);
    console.log(JSON.parse(data));
    let user_json = JSON.parse(data);

    console.log(JSON.stringify(data));
    
	console.log("UserDisp -->" + JSON.parse(data)["id"] + user_json["first_name"] + user_json["last_name"] );

        const heading = document.querySelector('p');
        heading.textContent = user_json["first_name"] + ' ' + user_json["last_name"] ;
  })
  .catch(error => console.error(error));

};


function make_clickable () {

	const myDiv1 = document.getElementById("p1");

	myDiv1.addEventListener("click", function( ){
		console.log("I am in p1 div clicked");
		console.log(myDiv1.textContent);

	fetch("/api/profile/", options)
	  .then(response => window.location = "/api/profile/?id=" + parm_userid)
	  .then(data => console.log ("I am in post user - client "))
	  .catch(error => console.error(error));

	});
	
};

