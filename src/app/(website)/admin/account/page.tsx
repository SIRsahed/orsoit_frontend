import React from 'react'
import AccountSettingsPage from '../../ceo-dashboard/account-settings/page'
import AccountSettingsForm from '../../account/settings/_components/account-settings'

export default function page() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 p-6">
                <AccountSettingsForm />
            </main>
        </div>
    )
}
