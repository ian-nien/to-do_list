import {v4 as uuidV4} from 'uuid'


import {getData, getAllData, postData, deleteData, updateData} from "./fuction"


// console.log("hello world")


type Task = {
  item: string
  description: string
  check: boolean
  order: number
  _id: string
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

  var items = document.querySelectorAll("#list li")
  // console.log(items.length)
  
  postData('http://localhost:9090/todos', { "item" : input_item?.value, "description" : input_description?.value, "check" : false,"order":(items.length+1) })
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
  var items = document.querySelectorAll("#list li")
  var delete_list = [ ]
  // console.log(list?.getElementsByTagName('li')[0].getElementsByTagName('label')[0].getElementsByTagName('input')[0].checked)
  if (list!=null){
    // console.log(list)
    // console.log(items)
    
    for(let i=0;i<items.length;i++){
      if(items[i].getElementsByTagName('label')[0].getElementsByTagName('input')[0].checked){
        // console.log(i)
        items[i].parentNode?.removeChild(items[i]) 
        // console.log(items[i]) 
        let url = 'http://localhost:9090/todos/' + items[i].id
        // console.log(url)
        deleteData(url).then(data => {
          console.log(data)
        })
        delete_list.push(i)
      }
    }
  }
  // console.log(items[0].getAttribute("order"))
  // console.log(delete_list)

  // console.log(delete_list)
  // update order
  for(let i = 0;i<items.length;i++){
    var order_reduce = 0
    // if the item is the remaining item, then run
    if(!delete_list.includes(i)){
      // how much order reduce
      for (let ii = 0; ii<i ;ii++){
        if(delete_list.includes(ii)){
          order_reduce = order_reduce + 1
        }
      }
      // console.log(order_reduce)s
      // console.log(Number(items[i].getAttribute("order"))-order_reduce)

      // if order need to reduce
      if (order_reduce!=0){
        let url = 'http://localhost:9090/todos/' + items[i].id
        // console.log(url)
        updateData(url,{"order": (Number(items[i].getAttribute("order"))-order_reduce)}).then(data => {
          console.log(data)
        })
        items[i].setAttribute('order',(Number(items[i].getAttribute("order"))-order_reduce).toString())
      }
    }
  }
  // console.log(items)
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

    let url: string = 'http://localhost:9090/todos/' + items[check_item].id
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

    let url: string = 'http://localhost:9090/todos/' + items[check_item].id
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

    let url: string = 'http://localhost:9090/todos/' + items[check_item].id
    // console.log(url)
    updateData(url, { "item" : input_item.value, "description" : input_description?.value})
    .then(data => {console.log(data)});

    input_item.value = '';
    input_description.value = '';
  }

})




function loadTask(){
  const alldata : todoList_interface = <todoList_interface>getAllData()
  // console.log(alldata.todos)
  var sort_todo: Task[] = alldata.todos.sort((a,b)=>{
    if(a.order > b.order){
      return 1;
    }
    if(a.order < b.order){
      return -1;
    }
    return 0
  })
  // console.log(sort_todo)
  sort_todo.forEach(addListItem)
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
    let url: string = 'http://localhost:9090/todos/' + task._id 
    // console.log(url)
    updateData(url, {"check" : checkbox.checked})
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
  item.setAttribute('order',task.order.toString())
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



const priority_button = document.getElementById('priority_button') 
priority_button?.addEventListener('click',e=>{
  e.preventDefault()
  // console.log("hi")
  var items = document.querySelectorAll("#list li")
  // console.log(items)
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

  items[check_item].parentNode?.insertBefore(items[check_item],items[0])
  
  let url = 'http://localhost:9090/todos/' + items[check_item].id
  // console.log(url)
  updateData(url,{"order": 1}).then(data => {
    console.log(data)
  })
  items[check_item].setAttribute("order","1")

  for (var i = 0; i<check_item;i++){
    let url = 'http://localhost:9090/todos/' + items[i].id
    // console.log(url)
    updateData(url,{"order": (Number(items[i].getAttribute("order"))+1)}).then(data => {
      console.log(data)
    })
    items[i].setAttribute('order', (Number(items[i].getAttribute("order"))+1).toString())
  }
})


