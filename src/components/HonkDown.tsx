import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import Scrollbars from './Scrollbars'

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        border: 'solid 1px grey'
    },
    selectRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    selectValue: {
        flexGrow: 1
    },
    selectHandle: {
        flexGrow: 0
    }
})

export interface HonkDownProps<T> {
    items: T[]
    value: string
    labelSelector: (item: T) => string
    valueSelector: (item: T) => string
    onChange: (value: string) => void
    onLoadMore?: () => void
    className?: string
    style?: React.CSSProperties
    searchable?: boolean
}

export const HonkDown = <T extends object>(props: HonkDownProps<T>) => {
    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const items = props.items.map((item: T) => {
        const label = props.labelSelector(item)
        const value = props.valueSelector(item)
        const selected = value === props.value
        return { label, value, selected }
    })

    const selectedItem = items.find(item => item.selected)
    const filteredItems = items.filter(item => item.label.toLowerCase().indexOf(search.toLowerCase()) > -1)

    const classNames = useStyles()

    const handleSelect = (value: string) => {
        props.onChange(value)
        setOpen(false)
        setSearch('')
    }

    const constHandleToggle = () => {
        if (open) {
            setSearch('')
        }
        setOpen(!open)
    }

    return <div className={props.className ? [classNames.root, props.className].join(' ') : classNames.root} style={props.style}>
        <div className={classNames.selectRow}>
            <div className={classNames.selectValue}>
                {selectedItem?.label}
            </div>
            <div
                onClick={constHandleToggle}
                className={classNames.selectHandle}
                dangerouslySetInnerHTML={{ __html: '🔽' }} />
        </div>
        {open && props.searchable && <div className={classNames.selectRow}>
            <input className={classNames.selectValue} type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
        </div>}
        {open && <Scrollbars>
            {filteredItems.map(item => {
            return <div key={item.value} className={classNames.selectRow} onClick={() => handleSelect(item.value)}>
                <div className={classNames.selectValue}>
                    {item.label}
                </div>
            </div>
        })}
        </Scrollbars>}
    </div>
}

export default HonkDown
