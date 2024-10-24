import { useSelector, useDispatch } from 'react-redux'
import TodoItem from './TodoItem'
import { useEffect } from 'react'
import { fetchTodos } from './todoSlice'


export default function TodoList() {

	const todos = useSelector(state => state.todos.todos)
	const sortedTodos = todos.slice().reverse()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchTodos())
	}, [dispatch])


	return (
		<ul className='todo__list'>
			{sortedTodos?.map(todo => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</ul>
	)
}