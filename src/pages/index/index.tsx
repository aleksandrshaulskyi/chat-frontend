import { ReactElement } from 'react'

import { ControlPanel } from '../../features/control-panel/ui/control-panel/control-panel'
import { Messenger } from '../../features/messenger/ui/messenger/messenger'

import IndexStyling from './index.module.css'


export function Index(): ReactElement {
    return (
        <div className={IndexStyling.mainWrapper}>
            <section className={IndexStyling.leftSection}>
                <ControlPanel />
            </section>
            <section className={IndexStyling.rightSection}>
                <Messenger />
            </section>
        </div>
    )
}