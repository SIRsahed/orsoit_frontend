import React from 'react'
import { RoomsList } from '../../account/my-rooms/_components/room-lists'

export default function page() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 p-6">
                <RoomsList />
            </main>
        </div>
    )
}
