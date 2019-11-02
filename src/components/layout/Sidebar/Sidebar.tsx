import React, { useState } from 'react';
import { FaChevronDown, FaInbox, FaRegCalendarAlt, FaRegCalendar } from 'react-icons/fa';
import './Sidebar.scss';
import { useSelectedProjectValue } from '../../../context';
import { Projects } from '../../Projects/Projects';
import { AddProject } from '../../AddProject/AddProject';

export const Sidebar: React.FC<{}> = () => {
	// @ts-ignore
	const { setSelectedProject } = useSelectedProjectValue();
	const [ active, setActive ] = useState('inbox');
	const [ showProjects, setShowProjects ] = useState(true);

	return (
		<div className="sidebar" data-testid="sidebar">
			<ul className="sidebar__generic">
				<li
					data-testid="inbox"
					className={active === 'inbox' ? 'active' : undefined}
					aria-label="Show inbox tasks"
					tabIndex={0}
					role="button"
					onClick={() => {
						setActive('inbox');
						setSelectedProject('INBOX');
					}}
					onKeyDown={() => {
						setActive('inbox');
						setSelectedProject('INBOX');
					}}
				>
					<span>
						<FaInbox />
					</span>
					<span>Inbox</span>
				</li>
				<li
					data-testid="today"
					className={active === 'today' ? 'active' : undefined}
					aria-label="Show today's tasks"
					tabIndex={0}
					role="button"
					onClick={() => {
						setActive('today');
						setSelectedProject('TODAY');
					}}
					onKeyDown={() => {
						setActive('today');
						setSelectedProject('TODAY');
					}}
				>
					<span>
						<FaRegCalendar />
					</span>
					<span>Today</span>
				</li>
				<li
					data-testid="next_7"
					className={active === 'next_7' ? 'active' : undefined}
					aria-label="Show tasks for the next 7 days"
					tabIndex={0}
					role="button"
					onClick={() => {
						setActive('next_7');
						setSelectedProject('NEXT_7');
					}}
					onKeyDown={() => {
						setActive('next_7');
						setSelectedProject('NEXT_7');
					}}
				>
					<span>
						<FaRegCalendarAlt />
					</span>
					<span>Next 7 days</span>
				</li>
			</ul>
			<div
				className="sidebar__middle"
				aria-label="Show/hide projects"
				onClick={() => setShowProjects(!showProjects)}
				onKeyDown={() => setShowProjects(!showProjects)}
				role="button"
				tabIndex={0}
			>
				<span>
					<FaChevronDown className={!showProjects ? 'hidden-projects' : undefined} />
				</span>
				<h2>Projects</h2>
			</div>
			<ul className="sidebar__projects">{showProjects && <Projects />}</ul>
			{showProjects && <AddProject />}
		</div>
	);
};
