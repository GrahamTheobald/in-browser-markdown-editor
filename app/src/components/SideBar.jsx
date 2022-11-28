import React from 'react'

export default function SideBar({ opened = false }) {
	return <>{opened && <div></div>}</>
}
