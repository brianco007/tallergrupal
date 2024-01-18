"use strict";
//Member input and btn
const $memberName = document.getElementById('memberName');
const $addBtn = document.getElementById('addBtn');
const $listOfMembers = document.getElementById('listOfMembers');
//Number of groups input and btn
const $groupsNumber = document.getElementById('groupsNumber');
const $createBtn = document.getElementById('createBtn');
const $groups = document.getElementById('groups');
let membersToRender = "";
let totalParticipants = 0;
let membersArray = [];
$addBtn.addEventListener('click', () => {
    totalParticipants++;
    membersArray.push($memberName.value);
    membersToRender += `<li> ${$memberName.value} </li>`;
    $memberName.value = "";
    $listOfMembers.innerHTML = membersToRender;
    console.log(totalParticipants);
    console.log(membersArray);
});
$createBtn.addEventListener('click', () => {
    const participantsPerGroup = membersArray.length / parseInt($groupsNumber.value);
    let groupToRender = "";
    for (let i = 0; i < Math.floor(parseInt($groupsNumber.value)); i++) {
        let ulElement = document.createElement('ul');
        ulElement.textContent = `Group #${i + 1}`;
        for (let i = 0; i < participantsPerGroup; i++) {
            const randomNumber = Math.floor(Math.random() * membersArray.length);
            let liElement = document.createElement('li');
            liElement.textContent = membersArray[randomNumber];
            ulElement.appendChild(liElement);
            membersArray.splice(randomNumber, 1);
        }
        $groups.appendChild(ulElement);
    }
});
