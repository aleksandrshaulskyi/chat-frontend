import { MouseEvent } from 'react'


export type TButton = {
    text: string,
    isActive: boolean,
    isLoading: boolean,
    onClick: (event: MouseEvent<HTMLButtonElement>) => void,
}
