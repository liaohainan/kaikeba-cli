"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Console, { LogEntry, LogMessage } from 'react-console-component';
import './main.css';

interface EchoConsoleState {
	count: number;
}
class EchoConsole extends React.Component<{}, EchoConsoleState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			count: 0,
		}

		setInterval(() => {
			const logEntry: LogEntry = {
				label: '',
				command: '',
				message: []
			}
			if (this.child.console.state.log.length === 0) {
				this.child.console.setState({
					log: [logEntry]
				}, this.child.console.scrollIfBottom());
			}
			this.child.console.log('text\n' + new Date());
		}, 100);
	}
	child: {
		console?: Console,
	} = {};

	echo = (text: string) => {
		console.log('echo:', text)
		this.child.console.log(text);
		this.setState(
			{
				count: this.state.count + 1,
			},
			this.child.console.return
		);
	}


	promptLabel = () => {
		return '>'
	}

	render() {
		return <Console ref={ref => this.child.console = ref}
			handler={this.echo}
			promptLabel={this.promptLabel}
			welcomeMessage={"Welcome to the react-console demo!\nThis is an example of a simple echo console."}
			autofocus={true}
		/>;

	}
}

export function init(element: Element) {
	ReactDOM.render(<EchoConsole />, element);
}
