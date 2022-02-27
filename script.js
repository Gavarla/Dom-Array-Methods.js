const main =document.getElementById('main')
const addUserBtn =document.getElementById('add-user')
const doubleBtn =document.getElementById('double')
const showMillionaireBtn =document.getElementById('show-millionair')
  console.log(showMillionaireBtn);
const sortBtn =document.getElementById('sort')
const calculatewealthBtn =document.getElementById('calculate-wealth')
   

getRamdomusers();
getRamdomusers();
getRamdomusers();


let data = [];
//fetch random user add money
async function getRamdomusers(){
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];

    const newuser ={
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()*1000000)
    };

    // console.log(newuser);
    addData(newuser);
} 
// Double eveyones money
function doubleMoney(){
    data = data.map(user =>{
        return {...user,money:user.money *2};
    })
    updateDom();
} 
// Sort users by richest
 function sortByRichest(){
     data.sort((a,b)=> b.money - a.money);

     updateDom();
 }
 //Filter only millionaires
 function showMillionaire(){
     data = data.filter(user =>user.money > 1000000);

     updateDom();
 }
 //calculatewealth
   function calculatewealth(){
       const wealth =data.reduce((acc, user)=>(acc +=user.money),0);
       const wealthEl = document.createElement('div');
       wealthEl.innerHTML = `<h3>Total Wealth:<strong>${formatMoney(wealth)}</strong></h3>`;
       main.appendChild(wealthEl);
   }
// add new obj to data arr
function addData(obj){
    data.push(obj);
    updateDom();
}

// Update Dom
function updateDom(providedData = data){
    // Clear main div
    main.innerHTML =`<h2><strong>Person</strong>Wealth</h2>`;
     providedData.forEach(item =>{
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML =`<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
    
});
    
}


// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }


  // Event listeners
  addUserBtn.addEventListener('click',getRamdomusers)
  doubleBtn.addEventListener('click',doubleMoney)
  sortBtn.addEventListener('click',sortByRichest)
  showMillionaireBtn.addEventListener('click',showMillionaire)
  calculatewealthBtn.addEventListener('click',calculatewealth)

