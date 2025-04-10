import React, { useEffect, useState } from "react";
import { getApi, upTask, deleteItemOnApi, newUser, deletUser } from "./workinAPI";
//create your first component
export const Home = () => {
	let [item, setItem] = useState("")
	let [listTarea, setListTarea] = useState([])
	const[counter, setCounter] = useState(0)
	
	const handleChange = (event) => {
		setItem(event.target.value)
	}
	const deleteTheUser = async()=>{
		try{
			await deletUser();
			await newUser();
			await loadTask();
		} catch (error){
			console.log("error")
		}
	}
	
	const deleteItem = async(idToDelete)=>{
		await deleteItemOnApi(idToDelete);
		const updateTask = await getApi();
		if (updateTask && updateTask.todos && Array.isArray(updateTask.todos)){
			setListTarea(updateTask.todos);
			setCounter(updateTask.todos.length);
		} else {
			console.error("Error: getApi en deleteItem no devolvió un array:", updateTask);
		}
	}

	const aNewTask = async(theTask)=>{
		theTask.preventDefault()
		const trimmedItem = item.trim()
		if(trimmedItem !== ""){
			await upTask(trimmedItem);
			const updateTask = await getApi();
			if (updateTask && updateTask.todos && Array.isArray(updateTask.todos)){
				setListTarea(updateTask.todos)
				setCounter(updateTask.todos.length)
				setItem("")
			} else {
				console.error("Error: getApi en aNewTask no devolvió un array:", updateTask);
			}
		}else{
			alert("Please, insert a new Tarea")
		}
	}
	const loadTask = async ()=>{
		const theTasks = await getApi();
		if (theTasks && theTasks.todos && Array.isArray(theTasks.todos)){
			setListTarea(theTasks.todos)
			setCounter(theTasks.todos.length)
		} else {
			await newUser()
			console.error("Error, getApi no devolvio un array.", theTasks);
			setListTarea([])
			setCounter(0)
			await loadTask()
		}
	}
	useEffect(()=>{
		loadTask();
	}, [])
	const activateHover = (evento) => {
		evento.currentTarget.style.backgroundColor = "grey";
		
	};
	
	const nonHover = (evento) => {
		evento.currentTarget.style.backgroundColor = "white";
		
	};
	return (
		<div className="mx-auto" style={{width: "25%"}}>
			<h1 className="text-center fs-1">TODO</h1>
			<form onSubmit={aNewTask}>
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
						<li key={newItem.id} onMouseEnter={activateHover} onMouseLeave={nonHover}  className="list-group-item d-flex justify-content-between">
							{newItem.label}
							<button className="btn" onClick={() =>{deleteItem(newItem.id)}}>
								<i className=" text-light fa-solid fa-x" ></i>
							</button>
						</li>
						)
					})}
				</ul>
			</div>
			{counter === 0 ? <div className="border rounded" style={{width: "100%"}}> &nbsp;You don't have Tareas</div>: null}
			<div className="border rounded d-flex justify-content-between align-items-center" onMouseEnter={activateHover} onMouseLeave={nonHover} >
				&nbsp;{counter} Pending Tasks
				{counter !== 0 ? <button type="button" className="btn" onClick={deleteTheUser}>
					<i className=" text-light fa-solid fa-x"></i>&nbsp;&nbsp;&nbsp;&nbsp;
				</button>:null}
			</div>
		</div>
	)
}