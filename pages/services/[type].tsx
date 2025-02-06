import { useRouter } from 'next/router'
import { ServiceDetails } from '@/components/ServiceDetails'
import { useContract } from '@/hooks/useContract'
import { Header } from '@/components/Header'

export default function ServicePage() {
  const router = useRouter()
  const { type } = router.query
  const { service, loading } = useContract().getServiceDetails(type as string)

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <ServiceDetails service={service} />
    </div>
  )
} 