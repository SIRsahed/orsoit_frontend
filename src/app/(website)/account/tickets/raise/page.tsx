import React from 'react'
import RaiseTicketForm from '../_components/raise-ticket-form'

export default function RaiseTickePage() {
    return (
        <div>
            <RaiseTicketForm services={[{name: "test", _id: "1"}, {name: "test2", _id: "2"}]}/>
        </div>
    )
}
