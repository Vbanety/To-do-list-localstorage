import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {

  
  const [theme, setTheme] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [classFirsElement, setClassFirsElement] = useState(false)
  const [todos, setTodos] = useState([])
  const [hidden, setHidden] = useState(false)

  const handleTheme = () => {
    setTheme(!theme)
  }

  
  useEffect(() => {
    let focus = document.getElementById('setText')
    focus.focus()
    
  }, [])

  const handleKeyPress = (e) => {
    
    if (e.key === 'Enter') {
      var array = JSON.parse(localStorage.getItem("data"));
      if (array == null) array = [];

      // INSERT DYNAMIC ID BY UUID GENERATOR LIB
      var str = uuidv4()

      var idStr = str.substring(0, 4)
      let text = "key"
      let keys = text.concat(idStr)

      // CREATE AN OBJECT
      var obj = {
        "id": uuidv4(),
        "key": keys,
        "value": inputValue,
        "status": true
      };

      // SET ON LOCALSTORAGE
      localStorage.setItem("obj", JSON.stringify(obj));

      // PUSH INSIDE ARRAY FROM LOCALSTORAGE
      array.push(obj);

      localStorage.setItem("data", JSON.stringify(array));
      let data = localStorage.getItem('data')

      const parseData = JSON.parse(data)

      setTodos(parseData)
      
      setInputValue(e.currentTarget.value = '')
      let elementEmpty = document.getElementById('fistReload')
      // elementEmpty.style.display = 'none'
      setClassFirsElement(!false)
      
    }
  }

  const handleRemoveItem = (e) => {
    let id = e.target.parentNode.parentNode.firstChild.value
    let array = localStorage.getItem("data");
    let parseArray = JSON.parse(array)
    let getItem = parseArray.findIndex(item => item.id == id)
    
    parseArray.splice(getItem, 1)
    
    // UPDATE QUANTITY OF INDEX INSIDE ARRAY ON LOCALSTORAGE AND NORMAL ARRAY 
    localStorage.setItem("data", JSON.stringify(parseArray));
    setTodos(parseArray)

  }

  const handleSublimeText = (e) => {
    let statusI = e.target.checked

    let idUpdate = e.target.id

    let checked = document.getElementById(`${idUpdate}`)
    var pElement = checked.parentElement.children[2]
    statusI == true ? pElement.classList.add('sub_line') : pElement.classList.remove('sub_line')

    let x = todos.filter(e => e.key == idUpdate)
    const { status } = x[0]

    status == true ? x[0].status = false : x[0].status = false

    localStorage.setItem("data", JSON.stringify(todos))

    let dd = localStorage.getItem('data')

    let xx = JSON.parse(dd)

    setTodos(xx)
    console.log(todos)
  }

  const handleClearAllList = () => {
    localStorage.removeItem("data")
    localStorage.removeItem("obj")
    setTodos([])
  }

  const handleFilterByActive = (e) => {

    var active = document.getElementById('active').checked

    var getAllInputs = document.getElementsByName('checkbox')
    

    if(active == true) {
      let filtered = todos.filter(e => e.status === true)
      
      localStorage.setItem('dataActive', JSON.stringify(filtered))
      
      let getActive = localStorage.getItem('dataActive')

      let activeParsed = JSON.parse(getActive)

      setTodos(activeParsed)
      let dd = document.querySelectorAll('#getLabel')
      dd.forEach(e => {
        e.style.background = 'transparent'
      })
    } else {
      setTodos(todos)
    }
    
    
  }

  const handleFilterByCompleted = () => {
    var completed = document.getElementById('completed').checked

    if(completed == true) {
      let completedData = todos.filter(e => e.status == false)
      localStorage.setItem('dataCompleted', JSON.stringify(completedData))

      let getCompleted = localStorage.getItem('dataCompleted')

      let completedParsed = JSON.parse(getCompleted)
      // console.log(completedParsed)
      setTodos(completedParsed)
    } else {
      
    }
  }

  const handleAllTask = () => {
    var all = document.getElementById('all').checked
    
    let data = localStorage.getItem('data')

    let parseData = JSON.parse(data)

    all == true ? setTodos(parseData) : undefined

  }

  return (
    <div className="App">
      <div className={theme ? 'container' : 'container_light'}>
        <div className={theme ? 'header_background' : 'header_background_light'}>
        </div>
        <div className={theme ? 'main' : 'main_light'}>
          <div className="todo_content">
            <div className="title">
              <h1>TODO</h1>
              <button onClick={() => handleTheme()}>
                <div className={theme ? 'btn_theme_sun' : 'btn_theme_dark'}></div>
              </button>
            </div>

            <div className={theme ? 'flex_list' : 'flex_list_light'}>
              {/* add list todo */}
              <div className={theme ? 'add_list' : 'add_list_light'}>
                <input id="checkbox_add" type="checkbox" />
                <label htmlFor="checkbox_add">
                </label>
                <input id="setText" onKeyPress={handleKeyPress} type="text" onChange={(e) => setInputValue(e.currentTarget.value)} placeholder='Type your todo and press enter' autoFocus/>
              </div>

              <ul>

                { todos.length == 0 
                ?  
                <li key={99999999} className={ classFirsElement ?  'fistReload' : undefined}>
                  <p>Empty list</p>
                </li>
                :
                todos.map((item, i) => {
                  return (
                    <>
                      <li key={i}>
                        <input 
                          id={item.key} type="checkbox" 
                          value={item.id} onClick={(e) => handleSublimeText(e)}
                          name="checkbox"
                        />
                        <label id='getLabel' htmlFor={item.key}>
                        </label>
                        <p>{item.value}</p>
                        <button 
                          id="removeItem" 
                          onClick={(e) => handleRemoveItem(e)} 
                          defaultValue={item.id}
                          >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </li>
                    </>
                  )
                })
                
                
              }

              </ul>
                <div className={theme ? 'footer' : 'footer_light'}>
                  <div className={theme ? 'total_items' : 'total_items_light'}>{todos.length} items left</div>
                  <div className="filter_type_list">
                    <div className={theme ? 'input_type' : 'input_type_light'}>
                    <input onClick={() => handleAllTask()} type="radio" name="filters" id="all"/>
                      <button>All</button>
                    </div>
                    <div className={theme ? 'input_type' : 'input_type_light'}>
                      <input onClick={(e) => handleFilterByActive(e)} type="radio" name="filters" id="active"/>
                      <button>Active</button>
                    </div>
                    <div className={theme ? 'input_type' : 'input_type_light'}>
                      <input onClick={() => handleFilterByCompleted()} type="radio" name="filters" id="completed"/>
                      <button>Completed</button>
                    </div>
                  </div>
                  <div className={theme ? 'clear_completed' : 'clear_completed_light'}>
                    <button onClick={() => handleClearAllList()}>Clear Completed</button>
                  </div>
                </div>
            </div>

            <div className="filter_type_list_out">
                    <div className={theme ? 'input_type' : 'input_type_light'}>
                      <button>All</button>
                    </div>
                    <div className={theme ? 'input_type' : 'input_type_light'}>
                      <button>Active</button>
                    </div>
                    <div className={theme ? 'input_type' : 'input_type_light'}>
                      <button>Completed</button>
                    </div>
                  </div>

          </div>

          <span>Drag and drop to rearder list</span>
        </div>
      </div>

      <div className="attribution">
        Challenge by <b>
          <a href="https://www.frontendmentor.io/profile/Vbanety" target="_blank">Frontend Mentor</a></b>.
        Coded by <b>
          <a href="https://current-portfolio-delta.vercel.app/" target="_blank">Vinicius Batista</a></b>.
      </div>
    </div>
  )
}

export default App

