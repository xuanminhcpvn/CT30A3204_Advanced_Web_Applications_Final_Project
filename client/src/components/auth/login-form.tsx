import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {z} from "zod";//this with react-hook-form will validate userInput //I don't think we have any restriction whether it is handled in front-end or back-end
import {useForm} from "react-hook-form";//handle formstate
import {zodResolver} from "@hookform/resolvers/zod";//resolve zod with react-hook-form

const loginSchema = z.object({
  username: z.string().min(5, "Username is required and must be at least 5 characters long"),//must have at least one character
  password: z.string().min(5, "Password is required and must be at least 5 characters long"),
});

type loginFormValues = z.infer<typeof loginSchema>

export function LoginForm({className,...props}: React.ComponentProps<"div">) {
  //register is part of useForm event, can't name it to login here
  //For login to work, in each input element we must state which attribute the input refer
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema)
  }); 

  //onSubmit => interact with backend
  const onSubmit = async (data: loginFormValues) => {
    console.log(data);
  }
  //onSubmit to 
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gape-6">
                {/*Header*/}
                <div className="flex flex-col items-center text-center gap-2">
                  <a href="/" className="mx-auto block w-fit text-center"/>
                  <h1 className="text-2xl font-fold"></h1>
                  <p className="text-muted-foreground text-balance">Login to start</p>
                </div>
                {/* username*/}
                <div className="flex flex-col gap-3">
                  <Label htmlFor="username" className="block text-sm">Username</Label>
                  <Input type="text" id="username" placeholder="Please insert username here..." {...register("username")}/>
                  {errors.username &&  (
                    <p className="text-destructive text-sm"> {errors.username.message}</p>
                  )}
                </div>
                {/*password*/}
                <div className="flex flex-col gap-3">
                  <Label htmlFor="password" className="block text-sm">Password</Label>
                  <Input type="password" id="password" {...register("password")}/>
                  {errors.password &&  (
                    <p className="text-destructive text-sm"> {errors.password.message}</p>
                  )}
                </div>
                {/*Login Button */}
                <Button type="submit" className="w-full" disabled={isSubmitting}>Login now </Button> 
                {/*Link to login route */}
                <div className="text-center text-sm">
                  Don't want to login? {" "}
                  <a href="/" className="underline underline-offset-4">Back to home page here</a>
                </div>
                {/***/}
              </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}