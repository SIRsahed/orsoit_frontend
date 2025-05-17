import TicketsList from '@/components/tickets/tickets-list'
import React from 'react'

export default function page() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 p-6">
                <TicketsList />
            </main>
        </div>
    )
}
