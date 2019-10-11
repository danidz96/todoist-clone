import React from 'react';
import { MdSettings } from 'react-icons/md';
import './Header.scss';

interface Props {}

export const Header: React.FC<Props> = () => {
	return (
		<header className="header" data-testid="header">
			<nav>
				<div className="logo">
					<img src="/images/logo.png" alt="Todoist" />
				</div>
				<div className="settings">
					<ul>
						<li data-testid="quick-add-task-action" className="settings__add">
							+
						</li>
						<li data-testid="dark-mode-action" className="settings__darkmode">
							<MdSettings />
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};
