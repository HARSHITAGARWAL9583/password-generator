const inputSlider = document.querySelector("[data-lengthslider]");
const lengthdisplay = document.querySelector("[data-length-number]");
const displaypassword = document.querySelector("[data-passworddisplay]");
const copybtn = document.querySelector("[data-copy]");
const copymsg = document.querySelector("[data-copied]");
const uppercasecheck = document.querySelector("#uppercase");
const lowercasecheck = document.querySelector("#lowercase");
const numberscheck = document.querySelector("#numbers");
const symbolscheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generatebtn = document.querySelector(".generatebutton");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let password = "";
let passwordlength = 10;
let checkcount = 0;
handleslider();
function handleslider() {
    inputSlider.value = passwordlength;
    lengthdisplay.innerText = passwordlength;
}
function setindicator(color) {
    indicator.style.backgroundColor = color;

}
function getrandominteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function generaterandomnumber() {
    return getrandominteger(0, 9);
}
function generatelowercase() {
    return String.fromCharCode(getrandominteger(97, 123));
}

function generateuppercase() {
    return String.fromCharCode(getrandominteger(65, 91));
}
function generatesymbol() {
    const randNum = getrandominteger(0, symbols.length);
    return symbols.charAt(randNum);
}
function calstrength() {
    let hasupper = false;
    let haslower = false;
    let hasnum = false;
    let hassym = false;
    if (uppercasecheck.checked) hasupper = true;
    if (lowercasecheck.checked) haslower = true;
    if (numberscheck.checked) hasnum = true;
    if (symbolscheck.checked) hassym = true;
    if (hasupper && haslower && (hasnum || hassym) && passwordlength >= 8) {
        setindicator("#0f0");
    }
    else if ((haslower || hasupper) &&
        (hasnum || hassym) &&
        passwordlength >= 6) {
        setindicator("#ff0");
    }
    else {
        setindicator("#f00");
    }
}
async function copycontent()
{
   try{
    await navigator.clipboard.writeText(displaypassword.value);
    copymsg.innerText = "copied"
   }
   catch(e)
   {
    copymsg.innerText = "failed";
   }
   copymsg.classList.add("active");
   setTimeout(()=>{
    copymsg.classList.remove("active");
   },2000);
}
function shufflepassword(array)
{
    //fisher yates methrod
for(let i=array.length -1 ;i>0;i--)
{
    const j = Math.floor(Math.random() * (i+1));
    const temp  = array[i];
      array[i] = array[j];
    array[j] = temp;
}
let str = "";
array.forEach((el) => (str = str + el));
return str;
};
function handlecheckboxchange()
{
checkcount =0;
allcheckbox.forEach((checkbox) => {
    if(checkbox.checked)
        checkcount++;
})

//sppecial case
if(passwordlength< checkcount)
{
  passwordlength= checkcount;
  handleslider();
}
};
allcheckbox.forEach((checkbox) => 
{
    checkbox.addEventListener("change", handlecheckboxchange);
})
inputSlider.addEventListener("input", (e)=>
{
    passwordlength = e.target.value;
    handleslider();
});
copybtn.addEventListener("click" , () =>
{
if(displaypassword.innerText)
 copycontent();

});
generatebtn.addEventListener("click" ,()=>
{
// none of the checkbox are selected 
if (checkcount==0)
    return ;
if(passwordlength<checkcount)
{
    passwordlength = checkcount;
    handleslider();
}
password = "";
let funcArr = [];
if(uppercasecheck.checked)
    funcArr.push(generateuppercase);

if(lowercasecheck.checked)
    funcArr.push(generatelowercase);

if(numberscheck.checked)
    funcArr.push(generaterandomnumber);

if(symbolscheck.checked)
    funcArr.push(generatesymbol);
for(let i=0;i<funcArr.length ;i++)
{
    password = password + funcArr[i]();
}
for(let i=0;i<passwordlength-funcArr.length;i++)
{
    let randindex = getrandominteger(0,funcArr.length);
    password =password+ funcArr[randindex]();
}
//shuffle the password 
password = shufflepassword(Array.from(password));
displaypassword.value = password;
calstrength();
});
