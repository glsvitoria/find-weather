/* eslint-disable no-param-reassign */
import { InputHTMLAttributes, useEffect, useRef } from 'react'

import { FileSearch } from '@phosphor-icons/react'
import { overrideTailwindClasses } from 'tailwind-override'

import { useField } from '@unform/core'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	name: string
	containerClassName?: string
	containerStyle?: any
}

export default function Input({
	label,
	name,
	containerClassName = '',
	className = '',
	...rest
}: IInputProps) {
	const inputRef = useRef<HTMLInputElement>(null)

	const { defaultValue, error, fieldName, registerField } = useField(name)

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			setValue(ref, value) {
				if (rest.type === 'checkbox') ref.checked = value
				else ref.value = value
			},
			path: rest.type === 'checkbox' ? 'checked' : 'value',
		})
	}, [registerField, fieldName, rest.type])

	return (
		<div className={`w-full ${overrideTailwindClasses(containerClassName)}`}>
			<label htmlFor={fieldName}>{label}</label>
			<div className="flex items-center">
				<input
					id={fieldName}
					name={fieldName}
					type="text"
					defaultValue={defaultValue}
					defaultChecked={defaultValue}
					ref={inputRef}
					className={`
          flex h-10 w-full items-center rounded-lg border border-solid border-zinc-300 bg-white px-2 text-zinc-900 transition placeholder:text-sm placeholder:leading-normal hover:border-zinc-400 focus:border-primary sm:text-base text-sm ${
					error ? 'border-error' : ''
				}`}
					{...rest}
				/>
			</div>

			{error && <span className="text-error">{error}</span>}
		</div>
	)
}
