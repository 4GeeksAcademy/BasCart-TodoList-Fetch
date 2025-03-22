import React, { useState } from "react";

//create your first component
export const Home = () => {
	let [item, setItem] = useState("")
	let [listTarea, setListTarea] = useState([])
	const[hover, setHover]= useState(false);
	const estilo = { backgroundColor: hover ? "lightgray" : "rgb(248, 249, 250)" }
	const[counter, setCounter] = useState(0)
	const add=()=> {setCounter ((prevCounter) => prevCounter + 1)}
	const sub=()=> {setCounter ((prevCounter) => prevCounter - 1)}
	
	const handleChange = (event) => {
		setItem(event.target.value)
	}
	const deleteItem = (currentIndex) => {
		setListTarea(listTarea.filter((item, index ) => index !== currentIndex))
	}
	return (
		<div className="mx-auto" style={{width: "25%"}}>
			<h1 className="text-center fs-1">TODO</h1>
			<form onSubmit={(event) => {
				event.preventDefault()
				setListTarea([item, ...listTarea])
				setItem("")
				add()
				
			}}>
				<input type="text"
					onChange={handleChange}
					value={item} className="form-control"
					placeholder="Insert Tarea"
				/>
			</form>
			<div>
				<ul className="list-group" onChange={setCounter}>
					{listTarea.map((newItem, index) => { 
						return(
						<li key={crypto.randomUUID()} style={estilo} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}  className="list-group-item d-flex justify-content-between">
							{newItem}
							<button className="btn  " onClick={() =>{
							deleteItem(index);
							sub()
							}}>
								<i className=" text-light fa-solid fa-x" ></i>
							</button>
						</li>
						)
					})}
				</ul>
			</div>
			<div className="border rounded">{counter} Pending Tasks</div>
		</div>
	)
}