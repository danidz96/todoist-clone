import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../../firebase';
import { useSelectedProjectValue } from '../../context';
import '../AddTask/AddTask.scss';
import { ProjectOverlay } from '../ProjectOverlay/ProjectOverlay';
import { TaskDate } from '../TaskDate/TaskDate';

interface Props {
	showAddTaskMain?: boolean;
	shouldShowMain?: boolean;
	showQuickAddTask?: boolean;
	setShowQuickAddTask?: any;
}

export const AddTask: React.FC<Props> = ({
	showAddTaskMain = true,
	shouldShowMain = false,
	showQuickAddTask,
	setShowQuickAddTask
}) => {
	const [ task, setTask ] = useState<string>('');
	const [ taskDate, setTaskDate ] = useState<string>('');
	const [ project, setProject ] = useState<string>('');
	const [ showMain, setShowMain ] = useState<boolean>(shouldShowMain);
	const [ showProjectOverlay, setShowProjectOverlay ] = useState<boolean>(false);
	const [ showTaskDate, setShowTaskDate ] = useState<boolean>(false);
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
					userId: 'PIlfw5ql9ExmqixfenaK'
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

			{(showMain || showQuickAddTask) && (
				<div className="add-task__main" data-testid="add-task-main">
					{showQuickAddTask && (
						<React.Fragment>
							<div data-testid="quick-add-task" className="add-task__quick">
								<h2 className="header">Quick Add Task</h2>
								<span
									className="add-task__cancel"
									data-testid="add-task-quick-cancel"
									onClick={() => {
										setShowMain(false);
										setShowProjectOverlay(false);
										setShowQuickAddTask(false);
									}}
								>
									X
								</span>
							</div>
						</React.Fragment>
					)}
					{
						<ProjectOverlay
							setProject={setProject}
							showProjectOverlay={showProjectOverlay}
							setShowProjectOverlay={setShowProjectOverlay}
						/>
					}
					<TaskDate setTaskDate={setTaskDate} showTaskDate={showTaskDate} setShowTaskDate={setShowTaskDate} />
					<input
						type="text"
						className="add-task__content"
						data-testid="add-task-content"
						value={task}
						onChange={(e) => setTask(e.target.value)}
					/>
					<button
						className="add-task__submit"
						data-testid="add-task"
						onClick={() => {
							showQuickAddTask ? addTask() && setShowQuickAddTask(false) : addTask();
						}}
						type="button"
					>
						Add Task
					</button>
					{!showQuickAddTask && (
						<span
							className="add-task__cancel"
							data-testid="add-task-main-cancel"
							onClick={() => {
								setShowMain(false);
								setShowProjectOverlay(false);
							}}
						>
							Cancel
						</span>
					)}
					<span
						className="add-task__project"
						data-testid="show-project-overlay"
						onClick={() => {
							setShowProjectOverlay(!showProjectOverlay);
						}}
					>
						<FaRegListAlt />
					</span>
					<span
						className="add-task__date"
						data-testid="show-task-date-overlay"
						onClick={() => setShowTaskDate(!showTaskDate)}
					>
						<FaRegCalendarAlt />
					</span>
				</div>
			)}
		</div>
	);
};
