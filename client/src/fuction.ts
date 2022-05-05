import {v4 as uuidV4} from 'uuid'

type Task = {
    item: string
    description: string
    check: boolean
  }
interface todoList_interface{
    todos: Task;
}

// const ans = (url : string) => {
//     // Default options are marked with *
//     const response = new Promise((resolve, reject)=>{
//         resolve(fetch(url))
//     })
//     return response
// }

// const ans = async function getAllData(url = 'http://localhost:9090/todos/get') {
//     // Default options are marked with *
//     const response = await fetch(url, {
//       method: 'GET', // *GET, POST, PUT, DELETE, etc.
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     })
//     return response.json()
//     // return response.json(); // parses JSON response into native JavaScript objects
// }


// async function getAllData(url = '') {
//     // Default options are marked with *
//     const response = await fetch(url, {
//       method: 'GET', // *GET, POST, PUT, DELETE, etc.
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     //   body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
// }


async function getData(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
    //   body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    
    return response.json(); // parses JSON response into native JavaScript objects
}


async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects

}
  
async function deleteData(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function updateData(url = '',data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function getAllData() {
    return body_getAllData
     
}
const response_getAllData = await fetch('http://localhost:9090/todos/get', {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
  //   body: JSON.stringify(data) // body data type must match "Content-Type" header
});
const body_getAllData = await response_getAllData.json()


// const postdata: todoList_interface = {
//     todos : {
//         item: "",
//         description: "",
//         check: false
//     }   
// }
// function post2 (data: Task){
//     postdata.todos = data
//     // response_postData
//     // return body_getSingleData
//     console.log(postdata.todos)
// }
// const response_postData = await fetch('http://localhost:9090/todos/create',{
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(postdata.todos)
// })
// const body_getSingleData = await response_postData.json()

// function post3(){
//     return body_getSingleData
// }

// async function postData2(url = '', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     const body = await response.json();
//     return body;
//     // return response.json(); // parses JSON response into native JavaScript objects
// }
// let url = '';
// let data = {
//     "item":"gas",
//     "description":"20",
//     "check":false
// }

// const test = await postData2 ('http://localhost:9090/todos/create',{"item":"gas","description":"20","check":false})
// function t(url="",data = {}){
//     url = url
//     data = data
//     return test
// }


// export{getData, getAllData, postData, deleteData, updateData,postData2}
export{getData, getAllData, postData, deleteData, updateData}