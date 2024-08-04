import React from 'react'
import AdminLayout from '../layout/AdminLayout'
import UserList from '../features/Users/UserList'

function SuperUserListPage() {
  return (
    <AdminLayout>
      <UserList />
    </AdminLayout>
  )
}

export default SuperUserListPage