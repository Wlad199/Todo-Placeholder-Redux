import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const URL = 'https://jsonplaceholder.typicode.com/todos/'


export const fetchTodos = createAsyncThunk(
	'todos/fetchTodos',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(URL + '?_limit=8')

			if (!response.status === 200) {
				throw new Error('Server Error')
			}

			const data = response.data
			return data

		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const changeStatusById = createAsyncThunk(
	'todos/changeStatusById', async (id, { rejectWithValue, getState, dispatch }) => {

		const todo = getState().todos.todos.find(todo => todo.id === id)

		try {
			const response = await axios.patch(URL + id, {
				completed: !todo.completed
			})

			if (!response.status) {
				throw new Error('Can\'t toggle status. Server error!')
			}

			dispatch(toggeleCompleteStatus(id))

		} catch (error) {
			rejectWithValue(error.message)
		}
	}
)

export const deleteTodoById = createAsyncThunk(
	'todos/deleteTodoById', async (id, { rejectWithValue, dispatch }) => {
		try {
			const response = await axios.delete(URL + id)

			if (!response.status) {
				throw new Error('Can\'t be deleted. Server error!')
			}

			dispatch(deleteTask(id))

		} catch (error) {
			rejectWithValue(error.message)
		}
	}
)

export const addNewTodo = createAsyncThunk(
	'todos/addNewTodo', async (todo, { rejectWithValue, dispatch }) => {
		try {

			const response = await axios.post(URL, {
				todo
			})

			if (!response.status) {
				throw new Error('Can\'t be added new task. Server error!')
			}

			const dataTodo = await response.data.todo
			console.log(dataTodo)
			dispatch(addTodo(dataTodo))

		} catch (error) {
			rejectWithValue(error.message)
		}
	}
)

const initialState = {
	todos: [],
	status: null,
	error: null
}

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: (state, action) => {
			if (action.payload.title) {
				state.todos.push(action.payload)
			}
		},
		toggeleCompleteStatus: (state, action) => {
			const chossenTodo = state.todos.find(todo => todo.id === action.payload)
			chossenTodo.completed = !chossenTodo.completed
		},
		deleteTask: (state, action) => {
			state.todos = state.todos.filter(todo => todo.id !== action.payload)
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchTodos.pending, (state, action) => {
				state.status = 'pending'
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.status = 'fulfilled'
				state.todos = action.payload
			})
			.addCase(fetchTodos.rejected, (state, action) => {
				state.status = 'rejected'
				state.error = action.payload
			})
			.addCase(addNewTodo.rejected, (state, action) => {
				state.status = 'rejected'
				state.error = action.payload
			})
			.addCase(deleteTodoById.rejected, (state, action) => {
				state.status = 'rejected'
				state.error = action.payload
			})
			.addCase(changeStatusById.rejected, (state, action) => {
				state.status = 'rejected'
				state.error = action.payload
			})
	}
})

export const { addTodo, toggeleCompleteStatus, deleteTask } = todoSlice.actions
export default todoSlice.reducer
