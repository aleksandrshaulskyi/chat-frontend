import { ReactElement } from 'react'

import { TPanoProps } from './pano-types'

import ApplicationStyling from '../../styling/application.module.css'
import PanoStyling from './pano.module.css'


export function Pano(props: TPanoProps): ReactElement {
    const width = {width: `${props.width}%`}
    const containerClassName = props.isLoading ? `${PanoStyling.innerContainer} ${ApplicationStyling.loading}` : `${PanoStyling.innerContainer}`

    return (
        <div className={PanoStyling.outerContainer}>
            <div className={containerClassName} style={{...width}}>
                { props.children }
            </div>
        </div>
    )
}
