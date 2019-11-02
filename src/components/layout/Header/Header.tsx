import React, { Dispatch, SetStateAction, useState } from 'react';
import { MdSettings } from 'react-icons/md';
import './Header.scss';
import { AddTask } from '../../AddTask/AddTask';

interface Props {
	darkMode: Boolean;
	setDarkMode: Dispatch<SetStateAction<boolean>>;
}

export const Header: React.FC<Props> = ({ darkMode, setDarkMode }) => {
	const [ shouldShowMain, setShouldShowMain ] = useState(false);
	const [ showQuickAddTask, setShowQuickAddTask ] = useState(false);
	return (
		<header className="header" data-testid="header">
			<nav>
				<div className="logo">
					<img src="/images/logo.png" alt="Todoist" />
				</div>
				<div className="settings">
					<ul>
						<li
							data-testid="quick-add-task-action"
							className="settings__add"
							aria-label="Quick add task"
							role="button"
							onClick={() => {
								setShowQuickAddTask(true);
								setShouldShowMain(true);
							}}
							onKeyDown={() => {
								setShowQuickAddTask(true);
								setShouldShowMain(true);
							}}
						>
							+
						</li>
						<li
							data-testid="dark-mode-action"
							className="settings__darkmode"
							aria-label="Darkmode on/off"
							role="button"
							onClick={() => setDarkMode(!darkMode)}
							onKeyDown={() => setDarkMode(!darkMode)}
						>
							<MdSettings />
						</li>
					</ul>
				</div>
			</nav>
			<AddTask
				showAddTaskMain={false}
				shouldShowMain={shouldShowMain}
				showQuickAddTask={showQuickAddTask}
				setShowQuickAddTask={setShowQuickAddTask}
			/>
		</header>
	);
};
