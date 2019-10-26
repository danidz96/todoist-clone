import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../../firebase';
import { useSelectedProjectValue } from '../../context';
import '../AddTask/AddTask.scss';

interface Props {
	showAddTaskMain?: boolean;
	shouldShowMain?: boolean;
	showQuickAddTask?: boolean;
	setShowQuickAddTask?: boolean;
}

export const AddTask: React.FC<Props> = ({
	showAddTaskMain = true,
	shouldShowMain = false,
	showQuickAddTask,
	setShowQuickAddTask
}) => {
	const [ task, setTask ] = useState('');
	const [ taskDate, setTaskDate ] = useState('');
	const [ project, setProject ] = useState('');
	const [ showMain, setShowMain ] = useState(shouldShowMain);
	const [ showProjectOverlay, setShowProjectOverlay ] = useState(false);
	const [ showTaskDate, setShowTaskDate ] = useState(false);
	//@ts-ignore
	const { selectedProject } = useSelectedProjectValue();

	const addTask = () => {
		const projectId = project || selectedProject;
		let collatedDate = '';

		if (projectId === 'TODAY') {
			collatedDate = moment().format('DD/MM/YYYY');
		} else if (projectId === 'NEXT_7') {
			collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
		}

		return (
			task &&
			projectId &&
			firebase
				.firestore()
				.collection('tasks')
				.add({
					archived: false,
					projectId,
					task,
					date: collatedDate || taskDate,
					userId: 'jlIFXIwyAL3tzHMtzRbw'
				})
				.then(() => {
					setTask('');
					setProject('');
					setShowMain(false);
					setShowProjectOverlay(false);
				})
		);
	};

	return (
		<div className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'} data-testid="add-task-comp">
			{showAddTaskMain && (
				<div
					className="add-task__shallow"
					data-testid="show-main-action"
					onClick={() => setShowMain(!showMain)}
					onKeyDown={() => setShowMain(!showMain)}
					tabIndex={0}
					aria-label="Add task"
					role="button"
				>
					<span className="add-task__plus">+</span>
					<span className="add-task__text">Add Task</span>
				</div>
			)}
		</div>
	);
};
