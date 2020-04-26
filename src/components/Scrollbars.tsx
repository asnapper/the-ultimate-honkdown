import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'


export interface ScrollbarProps {
    maxHeight?: string
}

const useStyles = createUseStyles({
    root: (props: ScrollbarProps) => ({
        maxHeight: props.maxHeight || '100px',
        overflow: 'hidden'
    }),
    content: {

    }
})

export const Scrollbars = (props: ScrollbarProps & { children?: React.ReactNode } ) => {

    const classNames = useStyles(props)

    return <div className={classNames.root}>
        <div className={classNames.content}>
            {props.children}
        </div>
    </div>
}

export default Scrollbars
