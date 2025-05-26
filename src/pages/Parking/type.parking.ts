export type TParking = {
    id: number;
    parkingNumber: number,
    available: boolean
}

export type TParkingData = {
    totalParkings: number;
    availableParkings: number;
    busyParkings: number;
}