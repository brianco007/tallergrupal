//Member input and btn
const $memberName = document.getElementById('memberName') as HTMLInputElement
const $addBtn = document.getElementById('addBtn') as HTMLButtonElement
const $listOfMembers = document.getElementById('listOfMembers') as HTMLElement
//Number of groups input and btn
const $groupsNumber = document.getElementById('groupsNumber') as HTMLInputElement
const $createBtn = document.getElementById('createBtn') as HTMLButtonElement
const $groups = document.getElementById('groups') as HTMLElement



let membersToRender: string = "";
let totalParticipants:number = 0;
let membersArray: string[] = [];


$addBtn.addEventListener('click', ()=>{
  totalParticipants++
  membersArray.push($memberName.value)
  membersToRender += `<li> ${$memberName.value} </li>`
  $memberName.value = ""
  $listOfMembers.innerHTML = membersToRender
  console.log(totalParticipants)
  console.log(membersArray)
})


$createBtn.addEventListener('click', ()=>{
  const participantsPerGroup: number = membersArray.length / parseInt($groupsNumber.value)
  
  let groupToRender: string = ""
  // for(let i = 0; i < Math.floor(parseInt($groupsNumber.value)); i++){
    
    for(let i=0; i<participantsPerGroup; i++ ){
      const randomNumber: number = Math.floor(Math.random() * membersArray.length)
      groupToRender += `<li>${membersArray[randomNumber]}</li>`
      membersArray.splice(randomNumber, 1)
    }
    $groups.innerHTML = groupToRender
  // }
})
