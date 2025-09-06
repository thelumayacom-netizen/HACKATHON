import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { emailService } from '@/lib/emailService';
import { CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function BattleResponse() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    handleBattleResponse();
  }, []);

  const handleBattleResponse = async () => {
    const battleId = searchParams.get('id');
    const action = searchParams.get('action');

    if (!battleId || !action) {
      setStatus('error');
      setMessage('Invalid battle response link');
      return;
    }

    try {
      // Get battle details
      const { data: battle, error: fetchError } = await supabase
        .from('battle_invitations')
        .select('*')
        .eq('id', battleId)
        .single();

      if (fetchError || !battle) {
        setStatus('error');
        setMessage('Battle invitation not found');
        return;
      }

      if (battle.status !== 'pending') {
        setStatus('error');
        setMessage('This battle invitation has already been responded to');
        return;
      }

      // Update battle status
      const newStatus = action === 'accept' ? 'accepted' : 'declined';
      const { error: updateError } = await supabase
        .from('battle_invitations')
        .update({ status: newStatus })
        .eq('id', battleId);

      if (updateError) {
        setStatus('error');
        setMessage('Failed to update battle status');
        return;
      }

      // Send notification email to inviter
      await emailService.sendBattleResponse(
        battle.inviter_email,
        battle.invitee_email,
        newStatus as 'accepted' | 'declined'
      );

      setStatus('success');
      setMessage(
        action === 'accept' 
          ? 'Challenge accepted! The battle has begun.' 
          : 'Challenge declined successfully.'
      );

    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          {status === 'loading' && (
            <div>
              <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-4" 
                   style={{borderColor: '#00ffff', borderTopColor: 'transparent'}} />
              <p>Processing your response...</p>
            </div>
          )}
          
          {status === 'success' && (
            <div>
              <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{color: '#00ff00'}} />
              <h2 className="text-2xl font-bold mb-2">Response Recorded</h2>
              <p className="text-muted-foreground mb-6">{message}</p>
              <a 
                href="/gamification" 
                className="inline-block px-6 py-3 rounded-lg font-bold"
                style={{backgroundColor: '#00ffff', color: '#000'}}
              >
                Go to Battle Arena
              </a>
            </div>
          )}
          
          {status === 'error' && (
            <div>
              <XCircle className="w-16 h-16 mx-auto mb-4" style={{color: '#ff0000'}} />
              <h2 className="text-2xl font-bold mb-2">Error</h2>
              <p className="text-muted-foreground">{message}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}