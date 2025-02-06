import Link from 'next/link'
import { ServiceType } from '@/types'

const services: ServiceType[] = [
  {
    id: 'gardening',
    title: 'Garden Maintenance & Landscaping',
    icon: 'yard',
    rate: '3-5 HH/hour',
    location: 'Remote'
  },
  {
    id: 'moving',
    title: 'Local Moving Help - Brooklyn',
    icon: 'local_shipping',
    rate: '4 HH/hour',
    location: 'Brooklyn, NY'
  },
  {
    id: 'furniture',
    title: 'Custom Furniture Building',
    icon: 'handyman',
    rate: '25 HH/project',
    location: 'On-site'
  }
]

export function ServiceCards() {
  return (
    <div className="grid gap-4 mt-8">
      {services.map(service => (
        <Link 
          key={service.id}
          href={`/services/${service.id}`}
          className="service-card"
        >
          <div className="flex items-center gap-4">
            <span className="material-icons-round">{service.icon}</span>
            <div>
              <h3>{service.title}</h3>
              <p>{service.rate}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 