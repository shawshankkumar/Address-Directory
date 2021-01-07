const readline=require('readline');
const fs=require('fs');
const { checkServerIdentity } = require('tls');

const r= readline.createInterface({
    input: process.stdin,
    output: process.stdout,

});
console.log("");
console.log("Welcome to the address directory. ");
console.log("");
console.log("There are "+checkindexfunc()+" entries in the directory."); //shows the number of entires and later checks if an entry can be deleted or not
console.log("");
console.log("Please choose one of the following options : ");
console.log("");

// Function ask() to ask user to enter a choice
ask();
function ask(){
r.question("Enter  (1) - To add a new address.  (2) - To delete a single entry  (3) - to view the entries (4) - To go out of the directory (5) - To delete all entries:  ", (option)=>{ 
    switchfunc(option);
});
}

function switchfunc(op){
switch (op)
    {
        case '1':add();
                break;
        case '2':
                del();
                break;
        case '3':
                show();
                break;
        case '4':end();
                 break;
        case '5':delall();
                 break;
        default: console.log("Wrong option. Please Choose again."); 
        console.log("");  
        ask();
    }
   
};
var i=0;

//the function which adds the new names and adresses to the directory.

function add(){
    console.log("");
    r.question("Enter the name: ",(n)=>{
        r.question("Enter the address: ", (address)=>{
            let data={
                name:n,
                address:address,
            }
            let json=JSON.stringify(data);
            fs.appendFileSync("directory.json",json+",", function(err){
                if(err)throw err;
            });
            console.log("");
            console.log("Thank you for entering your name and Address! It has been successfully added to the directory");
            console.log("");
            ask();
        
        })
    })
} 

//The function show which displays the directory 
function show(){
    let data=fs.readFileSync('directory.json','utf-8');
    let l=data.length;
    // console.log(data);
    let data1;
    if(data.length<3)
    data1="[]";
    else if(data.charAt(l-1)==',')
    data1="["+data.substring(0,data.length-1)+" ]";
    else if(data.charAt(l-1)=='}')
    data1="["+data.substring(0,data.length)+" ]";
    else if(data.charAt(l-1)==' ')
    data1="["+data.substring(0,data.length-2)+" ]";
    let data3=JSON.parse(data1);
    console.log("");
    console.table(data3); 
    ask();
}

//The function which takes in the index number of entry to be deleted. 
function del(){
    console.log("");
    console.log("Here is the entire directory: ");
    console.log("");
    display();    //another function similar to show() but this one comes back to the del() function instead of redirecting to the ask() function. 
    console.log("");
    r.question("Enter the index number of the element to be deleted  ",(del) => {
        deletedata(del);
    });
}

//The function which removes the data from the directory(the .json file)
function deletedata(index){
    let indexcheck=  checkindexfunc();
    if(index>=0&&index<indexcheck)
    {
    var data1=fs.readFileSync('directory.json','utf-8');
    let count=0; let char;
    index++;
    for(var i=0;i<data1.length;i++)
    {
        char=data1.substring(i,i+1);
      
        if(char=="{")
        {
            count++;
            if(count==index)
            break;
        }

    }

    let str=data1.substring(0,i);
    let indexno = data1.indexOf('}',i);
    let str1=data1.substring(indexno+2);
    str=str+str1;
    fs.writeFileSync('directory.json', str);
    console.log("");
    console.log("The entry with the index number "+(index-1)+" has been deleted.");
    console.log("");
    ask();
    }
    else {
    console.log("The index "+index+" does not exist. Enter an index no. in the range of 0 and "+indexcheck);
    ask();
    }
}

//function which takes the user out of the program and closes the readline
function end(){
    console.log("");
    console.log("Thank you for using our Address book. Your data is safe with us, you can access it again by using 'node add' command. lekin corona ke time me jaoge hi kaha. ");
    r.close();
}

//the function to delete all of the data and add a space to make sure when add() adds more data, there is a space in the beginning. 

function delall(){
    fs.writeFileSync('directory.json', " ");
    ask();
}

function display(){
    let data=fs.readFileSync('directory.json','utf-8');
    let l=data.length;
    // console.log(data);
    let data1;
    if(data.length<3)
    data1="[]";
    else if(data.charAt(l-1)==',')
    data1="["+data.substring(0,data.length-1)+" ]";
    else if(data.charAt(l-1)=='}')
    data1="["+data.substring(0,data.length)+" ]";
    else if(data.charAt(l-1)==' ')
    data1="["+data.substring(0,data.length-2)+" ]";
    let data3=JSON.parse(data1);
    console.log("");
    console.table(data3); 
}

function checkindexfunc()
{
    let data1=fs.readFileSync('directory.json', 'utf-8');
    let c=0; let char;
    for(let j=0;j<data1.length;j++)
    {
        char=data1.substring(j,j+1);
        if(char=='{')
        c++;
    }
    return c;
}