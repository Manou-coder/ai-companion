'use client'

import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'

interface SubscriptionButtonProps {
  isPro: boolean
}

export const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const onClick = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('/api/stripe')
      window.location.href = response.data.url
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      size="sm"
      variant={isPro ? 'default' : 'premium'}
    >
      {isPro ? 'Manage subscription' : 'Upgrade'}
      {!isPro && <Sparkles className="w-4 h-4 fill-white ml-2" />}
    </Button>
  )
}
