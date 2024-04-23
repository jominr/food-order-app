
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from './ui/sheet';
import { Menu } from 'lucide-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='text-orange-500'/>
      </SheetTrigger>
      {/* space-y-3: 下面3块内容的纵向间隔是3 */}
      <SheetContent className="space-y-3">
        <SheetTitle>
          <span>Weclome to MernEats.com!</span>
        </SheetTitle>
        <Separator />
        <SheetDescription className='flex'>
          <Button className='flex-1 font-bold bg-orange-500'>Log In</Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;