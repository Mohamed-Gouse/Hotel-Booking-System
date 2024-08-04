import React from 'react'
import HotelLayout from '../layout/HotelLayout'
import MakeReservation from '../features/bookings/MakeReservation'

function AdminReservationPage() {
  return (
    <HotelLayout>
        <MakeReservation />
    </HotelLayout>
  )
}

export default AdminReservationPage