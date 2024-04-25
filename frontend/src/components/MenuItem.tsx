import { MinusCircle, PlusCircle } from "lucide-react";
import { MenuItem as MenuItemType } from "../types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItemType;

  addToCart: () => void;
}

const MenuItem = ({ menuItem, addToCart } : Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>
          { menuItem.name }
        </CardTitle>
      </CardHeader>

      <CardContent className="font-bold flex justify-between">
        ${ (menuItem.price / 100).toFixed(2) }
        <PlusCircle strokeWidth={1.5}/>
      </CardContent>
    </Card>
  );
};

export default MenuItem;