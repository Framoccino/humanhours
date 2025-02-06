export interface ServiceType {
  id: string
  title: string
  icon: string
  rate: string
  location: string
  description?: string
}

export interface ContractService {
  provider: string
  title: string
  rate: number
  location: string
  description: string
  status: 'available' | 'booked' | 'completed'
} 