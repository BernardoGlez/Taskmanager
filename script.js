const data = [
  {
    title: `ejemplo`,
    id: 1
  },
  {
    title: `ejemplo`,
    id: 2
  }
]

var elements = localStorage.getItem('data')
 ? JSON.parse(localStorage.getItem('data'))
 : data;

const updateData = (task) => {
  elements.push(task);
  localStorage.setItem('data', JSON.stringify(elements));
}

const deleteData = (id) => {
  const index = elements.findIndex(element => element.id == id)
  elements.splice(index, 1);
  localStorage.setItem('data', JSON.stringify(elements));
}

const app =  document.getElementById("toDo")

const createTask = (element) => {
  var li = document.createElement("li");
  
  li.innerHTML = `
   <div contenteditable="true"> ${element.title} </div>
   <span class="close">×</span>
  `

  li.setAttribute("id", element.id)
  app.appendChild(li)

  li.getElementsByClassName("close")[0].onclick = () => {
    const id = li.getAttribute("id")
    li.style.display = "none";
    console.log(id)
    deleteData(id)
  }

  li.addEventListener("input", () => {
    const title = li.getElementsByTagName('div')[0].innerText;
    const id = li.getAttribute('id');
    const index = elements.findIndex(element => element.id === id);
    if (index !== -1) {     
        elements[index].title = title;
        localStorage.setItem('data', JSON.stringify(elements));
    }
    
}, false);

}

for (const element of elements) {
  createTask(element)
}

var close = document.getElementsByClassName("close");

// delete element
for (let i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
    const id = this.parentElement.getAttribute("id")
    deleteData(id)
  }
}

function newElement() {

  var title = document.getElementById("myInput").value;

  /*if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("toDo").appendChild(li);
  }*/
  
  const task = {
    title,
    id: Math.random().toString(8).slice(2)
  }

  createTask(task)
  updateData(task)
}