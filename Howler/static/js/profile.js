
console.log ("Entering profile.js ");

const query = window.location.search;
let parameters = new URLSearchParams(query);
let id = parameters.get('id');

console.log ("Entering profile.js1 " + id);

fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));


fetch(`/api/userinfo/${id}`)
  .then(response => response.json())
  .then(data => {
    console.log ("I am in profile user123 - client ");
    console.log(data);
    console.log(data["first_name"]);

        const para1 = document.getElementById('h1');
		para1.textContent = data["first_name"] + ' ' +  data["last_name"] + "\n\t\t" + '@' +  data["username"];
		
    	console.log("Before image set" + data["avatar"]);

        let img1 = document.getElementById("imgid");
    	console.log("After image set0" + img1);

 		img1.src = data["avatar"];
 		
    	console.log("After image set" + img1);

		// Get the select element from the HTML.
		const followingSelect = document.getElementById("following");
		let	followingList = data["follows"].split('|');
		console.log("-->following list and len " + followingList + "-->" + followingList.length);

		// Iterate through the following list and create option elements for each.
		followingList.forEach(follow => {
		  const option = document.createElement("option");
		  option.value = follow;
		  option.textContent = follow;
		  console.log(" In follows drop down list loop" + follow );
		  followingSelect.appendChild(option);
		});
  })
  .catch(error => console.error(error));

let howl_ary1 = [];
let howl_var = '';

fetch(`/api/howls/${id}`)
  .then(response => response.json())
  .then(data => {
    console.log ("I am in profile user howls - client ");
    console.log(data);
    console.log(JSON.stringify(data));

	let ary_howls = JSON.parse(data);
	
	console.log("Before printing all profile howls\n");
	console.log(ary_howls);
	console.log("After printing all profile howls\n");

	let ele_id_nm = '';

	for (var i=0; i < ary_howls.length;i++ ) {
	    ele_id_nm = 'p' + (i+1);
	    console.log(ele_id_nm);
        const para2 = document.getElementById(ele_id_nm);
		
        howl_ary1 = ary_howls[i].split('~');
		howl_var = howl_ary1[2] + ' ' + howl_ary1[3] + ' ' + howl_ary1[1] + '\t\t\t\t' + howl_ary1[4] + '\n' + howl_ary1[5];
		console.log(howl_var);
    	console.log ("I am in howls - client - printing " + howl_ary1[0]);

		para2.textContent = howl_var;

	}

  })
  .catch(error => console.error(error));



