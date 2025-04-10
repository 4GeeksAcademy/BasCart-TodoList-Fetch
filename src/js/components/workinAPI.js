const API_URL = `https://playground.4geeks.com`
const user = "BasCart"
export const newUser = async ()=>{
    try{
        const response = await fetch(API_URL + `/todo/users/${user}`,
            {method: "POST",
            headers:{
                "content-type": "application/json"
            }
            }
        )
    } catch(error){
        console.log(error)
    }

}
export const deletUser = async ()=>{
    try{
        const response = await fetch(API_URL + `/todo/users/${user}`,
            {method: "DELETE",
            headers:{
                "content-type": "application/json"
            }
            }
        )
        if(response.status === 204){
            return true
        } else {
            return false
        }
    } catch(error){
        console.log(error)
    }

}
export const getApi = async () =>{
    try{
        const response = await fetch(API_URL + `/todo/users/${user}`,{
            headers:{
                "content-type": "application/json"
            }
        })
        if(response.status === 200){
            const data = await response.json()
            console.log(data)
            return data
        }
    } catch (error) {
        console.log("Error Catch")
    }
}

export const upTask = async (newTask) =>{
    try{
        const response = await fetch(API_URL + `/todo/todos/${user}`,{
            method: "POST",
            body: JSON.stringify({
                "label": newTask,
                "is_done": false
            }),
            headers:{
                "content-type": "application/json"
            }
        })
        if (response.status !== 201){
            throw new Error(`Error al crear tarea: ${response.status}`);
        }
    } catch (error){
        console.log("errorrr")
    }
}
export const deleteItemOnApi = async (taskId)=>{
    try{
        const response = await fetch(API_URL + `/todo/todos/${taskId}`,{
            method: "DELETE",
            headers:{
                "content-type": "application/json"
            }
        })
        if(response.status !== 204){
            throw new error(`error al eliminar: ${response.status}`)
        }
    }
    catch(error){
        console.log(errorrrrrr)
    }
}