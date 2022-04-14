import React from 'react'
import { GitHub } from '~/assets/icons/Github'

const Home:React.FC = () => {
	return (
		<div style={{
			height: '70vh',
			display: 'flex',
			justifyContent: 'center',
			flexDirection: 'column',
			gap: '1rem'
		}}>
			<h1>Hello, I'm AKAZWZ</h1>
			<h2 style={{
				fontWeight: 'lighter'
			}}
			>
				Currently leaning and coding.
			</h2>
			<a href={'https://github.com/akazwz'} rel="noreferrer" target="_blank"
			   style={{ width: '3rem', height: '3rem' }}>
				<GitHub />
			</a>
		</div>
	)
}

export default Home