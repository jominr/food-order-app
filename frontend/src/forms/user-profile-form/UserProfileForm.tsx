import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// formSchema: validation and validation messages
const formSchema = z.object({
  email: z.string().optional(),
  // name has to have at least one character
  name: z.string().min(1, "name is required"),
  addressLine1: z.string().min(1, "addressLine1 is required"),
  city: z.string().min(1, "city is required"),
  country: z.string().min(1, "country is required"),
});

// use z framework to infer or automatically determine the type based on the formSchema;
type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: User,
  onSave: (userProfileData : UserFormData) => void;
  isLoading: boolean;
}

// 参数括号里，control + space，提示有哪些类型
const UserProfileForm = ({ currentUser, isLoading, onSave}: Props) => {
  // shad cn中的form 也是基于 react hook form
  // using react hook form library to initilize a form 
  const form = useForm<UserFormData>({ 
    resolver: zodResolver(formSchema), // 解析器，handle things like validation
    defaultValues: currentUser, // 默认值
  });

  useEffect(() => {
    form.reset(currentUser); // 如果reRender或者current user改变，重置表单
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        {/* handleSubmit: handle validation and call function onSave  */}
        <div>
          <h2 className="text-2xl font-bold">User Profile Form</h2>
          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({field})=>(
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white"/>
              </FormControl>
            </FormItem>
          )}/>

        <FormField
          control={form.control}
          name="name"
          render={({field})=>(
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({field})=>(
              <FormItem className="flex-1">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

          <FormField
            control={form.control}
            name="city"
            render={({field})=>(
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

          <FormField
            control={form.control}
            name="country"
            render={({field})=>(
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
        </div>
        
        {isLoading ? <LoadingButton /> : <Button type="submit" className="bg-orange-500">Submit</Button>}
      
      </form>
    </Form>
  );
};

export default UserProfileForm;