import React from 'react';
import { MdSettings } from 'react-icons/md';

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
						<li>+</li>
						<li>
							<MdSettings />
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};
