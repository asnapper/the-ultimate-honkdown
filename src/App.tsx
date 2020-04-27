import React, { useState } from 'react'
import HonkDown from './components/HonkDown'

interface Item {
    href: string
    title: string
}


const valueSelector = (item: any) => item.href
const labelSelector = (item: any) => item.title

const App = () => {
    const [ items, setItems ] = useState<Item[]>([
        { href: 'http://bla.com/items/1', title: 'First Item' },
        { href: 'http://bla.com/items/2', title: 'Second Item' },
        { href: 'http://bla.com/items/3', title: 'Third Item' },
        { href: 'http://bla.com/items/4', title: 'Fourth Item' },
        { href: 'http://bla.com/items/5', title: 'Fifth Item' },
        { href: 'http://bla.com/items/6', title: 'Sixt Item' },
        { href: 'http://bla.com/items/7', title: 'Seventh Item' },
        { href: 'http://bla.com/items/8', title: 'Eight Item' },
    ])

    const getMoreItems = () => {
        if (items.length < 100) {
            setItems([...items,
                { href: 'http://bla.com/items/' + (items.length + 1), title: 'Item ' + (items.length + 1) },
                { href: 'http://bla.com/items/' + (items.length + 2), title: 'Item ' + (items.length + 2) },
                { href: 'http://bla.com/items/' + (items.length + 3), title: 'Item ' + (items.length + 3) }
            ])
        }
    }
    
    const [ value, setValue ] = useState<string>('http://bla.com/items/4')

    return <div className="App" style={{ width: '400px' }}>
        <HonkDown<Item>
            items={items}
            value={value}
            labelSelector={labelSelector}
            valueSelector={valueSelector}
            onLoadMore={getMoreItems}
            onChange={setValue}
            searchable={true}
        />
    </div>
}

export default App
