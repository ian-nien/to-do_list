import {v4 as uuidV4} from 'uuid'

// // import {getData, getAllData, postData, deleteData, updateData,getData2} from "./function"
import {getData, getAllData, postData, deleteData, updateData, postData2} from "./fuction"



// console.log("hello world")

type Task = {
  item: string
  description: string
  check: boolean
  createdAt: Date
  _id: string
  updateAt: Date
}

interface todoList_interface{
  todos: Task[];
}

interface todoItem_interface{
  todo: Task;
}
  

const list = document.querySelector<HTMLUListElement>('#list')
const input_item = document.querySelector<HTMLInputElement>('#new_task_item')
const input_description = document.querySelector<HTMLInputElement>('#new_task_description')

loadTask()
// console.log(list)



const add_button = document.getElementById('add_button') 
add_button?.addEventListener('click',e=>{
  // console.log("hi")
  e.preventDefault()
  if(input_item?.value == '' || input_item?.value == null) return
  

  postData('http://localhost:9090/todos/create', { "item" : input_item?.value, "description" : input_description?.value, "check" : false })
  .then(data => {
    console.log(data); 
    const oneOflist : todoItem_interface = <todoItem_interface>data
    addListItem(oneOflist.todo)
  });
  
  input_item.value = "";
  if(input_description?.value != '' && input_description?.value != null) {
    input_description.value = "";
  }
  
  // var li = list?.getElementsByTagName('li')
  // console.log(li)
})

const delete_button = document.getElementById('delete_button') 
delete_button?.addEventListener('click',e=>{
  e.preventDefault()
  // console.log(list?.getElementsByTagName('li')[0].getElementsByTagName('label')[0].getElementsByTagName('input')[0].checked)
  if (list!=null){
    var items = document.querySelectorAll("#list li")
    // console.log(list)
    // console.log(items)
    
    for(let i=0;i<items.length;i++){
      if(items[i].getElementsByTagName('label')[0].getElementsByTagName('input')[0].checked){
        // console.log(i)
        items[i].parentNode?.removeChild(items[i]) 
        // console.log(items[i]) 
        let url = 'http://localhost:9090/todos/delete/' + items[i].id
        console.log(url)
        deleteData(url).then(data => {
          console.log(data)
        })
      }
    }
  }
})

const update_button = document.getElementById('update_button') 
update_button?.addEventListener('click',e=>{
  e.preventDefault()
  // console.log("hi")
  
  if((input_item?.value == '' || input_item?.value == null) && (input_description?.value =='' || input_description?.value == null)) return
  // if(input_description?.value == '' || input_description?.value == null) return
  var items = document.querySelectorAll("#list li")
  var check_item_sum = 0
  var check_item = 0 
  for(let i=0;i<items.length;i++){
    if(items[i].getElementsByTagName('label')[0].getElementsByTagName('input')[0].checked){
      check_item_sum = check_item_sum + 1
      check_item = i
    }
  }
  // console.log(check_item_sum)
  // console.log(check_item)
  if (check_item_sum != 1) return
  // console.log("hi")

  if(input_item?.value == '' || input_item?.value == null){
    items[check_item].getElementsByTagName('label')[2].innerText = "(" + input_description?.value +")"
    // console.log(items[check_item].getElementsByTagName('label')[1].innerText)
    // console.log(items[check_item].getElementsByTagName('label')[2].innerText)

    let url: string = 'http://localhost:9090/todos/update/' + items[check_item].id
    // console.log(url)
    updateData(url, { "description" : input_description?.value})
    .then(data => {console.log(data)});

    if(input_description?.value != '' && input_description?.value != null) {
      input_description.value = "";
    }

  }else if(input_description?.value == '' || input_description?.value == null){
    // console.log("hi")
    items[check_item].getElementsByTagName('label')[1].innerText = input_item.value
    // console.log(items[check_item].getElementsByTagName('label')[1].innerText)
    // console.log(items[check_item].getElementsByTagName('label')[2].innerText)

    let url: string = 'http://localhost:9090/todos/update/' + items[check_item].id
    // console.log(url)
    updateData(url, { "item" : input_item.value})
    .then(data => {console.log(data)});

    input_item.value = "";
  }else{
    // console.log("hi")
    items[check_item].getElementsByTagName('label')[1].innerText = input_item.value
    items[check_item].getElementsByTagName('label')[2].innerText = "(" + input_description?.value +")"
    // console.log(items[check_item].getElementsByTagName('label')[1].innerText)
    // console.log(items[check_item].getElementsByTagName('label')[2].innerText)

    let url: string = 'http://localhost:9090/todos/update/' + items[check_item].id
    // console.log(url)
    updateData(url, { "item" : input_item.value, "description" : input_description?.value})
    .then(data => {console.log(data)});

    input_item.value = '';
    input_description.value = '';
  }

})




function loadTask(){
  const alldata : todoList_interface = <todoList_interface>getAllData()
  alldata.todos.forEach(addListItem)
}
function addListItem(task: Task){
  const item = document.createElement("li")
  const label = document.createElement('label')
  const label2 = document.createElement('label')
  const label3 = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.addEventListener('change',() =>{
    task.check = checkbox.checked
    // console.log(task._id)
    let url: string = 'http://localhost:9090/todos/update/' + task._id 
    // console.log(url)
    updateData(url, { "item" : task.item, "description" : task.description, "check" : checkbox.checked})
    .then(data => {console.log(data)});
  })
  
  checkbox.type = 'checkbox'
  checkbox.checked = task.check
  label.append(checkbox)
  label2.append(task.item)
  label3.append("  (",task.description,")")
  item.append(label,label2,label3)
  item.setAttribute('description',task.description)
  item.setAttribute('id',task._id)
  list?.append(item)
  
}



const filter_input = document.querySelector<HTMLInputElement>('#filter_input')

filter_input?.addEventListener('keyup',filter_name)
function filter_name(){
  // console.log("hi")
  var filter_text = filter_input?.value.toUpperCase()
  var items = document.querySelectorAll<HTMLElement>("#list li")
  // console.log(filter_text)
  // console.log(items[0].getElementsByTagName('label')[1].innerText)
  if(filter_text!=null){
    console.log(filter_text)
    for (let i =0;i<items.length;i++){
      var txtvalue = items[i].getElementsByTagName('label')[1].innerText
      if (txtvalue.toUpperCase().indexOf(filter_text)> -1){
        // console.log("hi")
        items[i].style.display = ''
      }else{
        items[i].style.display = "none"
      }
    }
  }
}



// const priority_button = document.getElementById('priority_button') 
// priority_button?.addEventListener('click',e=>{
//   e.preventDefault()
//   // console.log("hi")
//   var items = document.querySelectorAll("#list li")
//   // console.log(items)
//   var check_item_sum = 0
//   var check_item = 0 
//   for(let i=0;i<items.length;i++){
//     if(items[i].getElementsByTagName('label')[0].getElementsByTagName('input')[0].checked){
//       check_item_sum = check_item_sum + 1
//       check_item = i
//     }
//   }
//   // console.log(check_item_sum)
//   // console.log(check_item)
//   if (check_item_sum != 1) return

//   items[check_item].parentNode?.insertBefore(items[check_item],items[0])
  
// })


