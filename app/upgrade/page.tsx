import { redirect } from 'next/navigation';

export default function Upgrade() {
  // Immediately redirect to the checkout page where the paywall logic resides.
  redirect('/checkout');
  return null; // This line is unreachable but satisfies function signature.
}
