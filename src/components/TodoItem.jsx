import { LiaClipboardListSolid } from "react-icons/lia";
import { IoCheckmarkDone } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from 'react-redux'
import { deleteTodoById, changeStatusById } from "./todoSlice";
import cn from 'classnames'



export default function TodoItem({ todo }) {

	const dispatch = useDispatch()

	return (
		<li className={cn('todo__item', { active: todo.completed })}>
			<LiaClipboardListSolid className="icon__task" />
			<span onClick={() => dispatch(changeStatusById(todo.id))}>
				{todo.title}
			</span>
			<IoCheckmarkDone
				onClick={() => dispatch(changeStatusById(todo.id))}
				className="icon__check"
			/>
			<RiDeleteBinLine
				onClick={() => dispatch(deleteTodoById(todo.id))}
				className="icon__delete" />
		</li>
	)
}
