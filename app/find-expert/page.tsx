import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function FindExpertPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Find a Tax Expert Directory</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Expert 1 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Image src="https://randomuser.me/api/portraits/men/32.jpg" alt="Expert 1" width={56} height={56} className="rounded-full" />
              <div>
                <CardTitle>Ahmad Rahman</CardTitle>
                <div className="text-sm text-muted-foreground">Certified Tax Agent</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm mb-2">Specialty: Freelancers, Sole Proprietors, SMEs</div>
            <div className="text-xs text-muted-foreground">Kuala Lumpur</div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" disabled>View Profile</Button>
          </CardFooter>
        </Card>
        {/* Expert 2 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Image src="https://randomuser.me/api/portraits/women/44.jpg" alt="Expert 2" width={56} height={56} className="rounded-full" />
              <div>
                <CardTitle>Lim Siew Ling</CardTitle>
                <div className="text-sm text-muted-foreground">Licensed Accountant</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm mb-2">Specialty: Company (Sdn Bhd), Payroll, GST/SST</div>
            <div className="text-xs text-muted-foreground">Penang</div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" disabled>View Profile</Button>
          </CardFooter>
        </Card>
        {/* Expert 3 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Image src="https://randomuser.me/api/portraits/men/65.jpg" alt="Expert 3" width={56} height={56} className="rounded-full" />
              <div>
                <CardTitle>Rajiv Menon</CardTitle>
                <div className="text-sm text-muted-foreground">Tax Consultant</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm mb-2">Specialty: Startups, Digital Nomads, Tax Planning</div>
            <div className="text-xs text-muted-foreground">Johor Bahru</div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" disabled>View Profile</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 