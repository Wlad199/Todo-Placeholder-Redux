import { useState } from "react"
import { useDispatch } from 'react-redux'
import { addNewTodo } from "./todoSlice"
import { nanoid } from 'nanoid'


export default function NewTodoForm() {

	const [inputValue, setInputValue] = useState('')
	const dispatch = useDispatch()


	const sendTodoHandler = () => {
		const todo = {
			userId: 1,
			id: nanoid(),
			title: inputValue,
			completed: false
		}
		dispatch(addNewTodo(todo))
		setInputValue('')
	}

	return (
		<form className="todo__form">
			<input
				className="todo__input"
				type="text"
				placeholder="Enter new todo"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button
				className="todo__button-send"
				type="button"
				onClick={sendTodoHandler}
			>
				Submit
			</button>
		</form>
	)
}