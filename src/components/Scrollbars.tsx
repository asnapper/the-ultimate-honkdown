import React, { useState, useRef, useEffect } from 'react'
import { createUseStyles } from 'react-jss'


export interface ScrollbarProps {
    maxHeight?: string
    atBottom?: () => void
}

const useStyles = createUseStyles({
    root: (props: ScrollbarProps) => ({
        maxHeight: props.maxHeight || '100px',
        overflow: 'auto'
    }),
    content: {

    }
})

export const Scrollbars = (props: ScrollbarProps & { children?: React.ReactNode } ) => {

    const classNames = useStyles(props)
    const rootRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    const handleScroll = (event: Event) => {
        const target = event.target as HTMLDivElement
        const clientHeight = contentRef.current?.clientHeight
        const offset = clientHeight && clientHeight - (target.clientHeight + target.scrollTop)

        if (offset === 0 && props.atBottom) {
            props.atBottom()
        }

        return
    }

    useEffect(() => {

        const current = rootRef.current
        
        current?.addEventListener('scroll', handleScroll)

        return () => {
            current?.removeEventListener('scroll', handleScroll)
        }

    }, [rootRef])

    return <div className={classNames.root} ref={rootRef}>
        <div className={classNames.content} ref={contentRef}>
            {props.children}
        </div>
    </div>
}

export default Scrollbars
