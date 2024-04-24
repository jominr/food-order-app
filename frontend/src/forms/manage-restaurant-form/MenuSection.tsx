
import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
  const { control } = useFormContext();
  // fields: is an array, and each one has name and price.
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems"
  })
  return (
    <div className="space-y-2">
      <div>
      <h2 className="text-2xl font-bold">Menu</h2>
      <FormDescription>
        Create your menu and give each item a name and a price
      </FormDescription>
      </div>
    

      <FormField
        control={control}
        name="menuItems"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((item, index)=>(
              <MenuItemInput
                key={item.id}
                index={index}
                removeMenuItem={()=> remove(index)}
              />
            ))}
          </FormItem>
        )}>
      </FormField>
      <Button type="button" onClick={()=> append({name: "", price: ""})}>
        Add Menu Item
      </Button>
    
    </div>
  );
};

export default MenuSection;