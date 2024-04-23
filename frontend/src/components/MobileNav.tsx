
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from './ui/sheet';
import { CircleUserRound, Menu } from 'lucide-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useAuth0 } from '@auth0/auth0-react';
import MobileNavLinks from './MobileNavLinks';

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='text-orange-500'/>
      </SheetTrigger>
      {/* space-y-3: 下面3块内容的纵向间隔是3 */}
      <SheetContent className="space-y-3">
        <SheetTitle>
          { isAuthenticated ? (
            <span className='flex items-center font-bold gap-2'>
              <CircleUserRound className='text-orange-600' />
              { user?.email }
            </span>
          ) : (
            <span>Weclome to MernEats.com!</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className='flex flex-col gap-4'>
          { isAuthenticated ? (<MobileNavLinks />) : (
            <Button onClick={()=> loginWithRedirect()} className='flex-1 font-bold bg-orange-500'>Log In</Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;