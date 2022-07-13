const itemCount = document.querySelector('.count span');

itemCount.innerText = document.querySelectorAll('.list').length;

const bg = document.querySelector('.bg');
const themeIcon = document.querySelector('.chng');

themeIcon.addEventListener('click',()=>{

    document.body.classList.toggle('light')
    if(document.body.classList.contains('light')){
        themeIcon.src = 'images/icon-moon.svg'
        document.body.style.backgroundColor = "white";
        bg.style.backgroundImage = url("images/bg-desktop-dark.jpg");
    }else{
        themeIcon.src = 'images/icon-sun.svg'
        document.body.style.backgroundColor = "black";
        bg.style.backgroundImage = url("images/bg-desktop-dark.jpg");
    }
})

const addButton = document.querySelector('.tasks button');
const itemInput = document.getElementById('tasks');
const todo = document.querySelector('.todo-list ul');

const itemID = document.querySelector('.filter input[type="radio"]:checked');

addButton.addEventListener('click',()=>{
    if(itemInput.value.length > 0){
        addItems(itemInput.value);
        itemInput.value = '';
    }
})

itemInput.addEventListener('keypress',(event)=>{
    if(event.charCode === 13 && itemInput.value.length > 0){
        addItems(itemInput.value);
        itemInput.value = '';
    }
})

function addItems(text){
    const item = document.createElement('li');
    item.innerHTML = 
    `
    <label class="list">
    <input class="checkbox" type="checkbox"> 
    <span class="text">${text}</span>
    </label>
    <span class="remove"></span>
    `;
    if(itemID.id === 'completed'){
        item.classList.add('disnone');
    }
    todo.append(item);
    console.log(todo);
    updateCount(1);
}

function updateCount(num) {
    itemCount.innerText = +itemCount.innerText + num;
}

function removeItems(item){
    item.remove();
    updateCount(-1);
}

todo.addEventListener('click',(event)=>{
    if(event.target.classList.contains('remove')){
        console.log(event.target.parentElement);
        removeItems(event.target.parentElement);
    }
})

document.querySelectorAll('.filter input').forEach(radio =>{
    radio.addEventListener('change',(event)=>{
        filterTodo(event.target.id);
    })
})

function filterTodo(id){
    const allItems = document.querySelectorAll('li');


    switch(id){
        case 'all':
            allItems.forEach(item =>{
                item.classList.remove('disnone');
        })    
        break;
        case 'active':
            allItems.forEach(item =>{
                if(item.querySelector('input').checked){
                    item.classList.add('disnone')
                }else{
                    item.classList.remove('disnone')
                }
        })
        break;
        default:
            allItems.forEach(item =>{
                if(item.querySelector('input').checked){
                    item.classList.remove('disnone')
                }else{
                    item.classList.add('disnone')
                }
            })
            break;
    }
}
const clear = document.querySelector('.clear');

clear.addEventListener('click',()=>{
    const itemChecked = document.querySelectorAll('.list input[type="checkbox"]:checked');
    itemChecked.forEach(item=>{
        removeItems(item.closest('li'));
    })
})
