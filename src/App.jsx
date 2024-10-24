//import classNames from 'classnames'
import React from 'react'
import NewTodoForm from './components/NewTodoForm'
import TodoList from './components/TodoList'
import { useSelector } from 'react-redux'
import Skeleton from './components/Skeleton'

export default function App() {

	const { status, error } = useSelector(state => state.todos)

	return (
		<>
			<h1 className='todo__title'>Todo App</h1>
			<NewTodoForm />
			{status === 'pending' &&
				<div className='skeleton-list'>
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			}
			{error && <h2>An error occured {error}</h2>}
			<TodoList />
		</>
	)
}