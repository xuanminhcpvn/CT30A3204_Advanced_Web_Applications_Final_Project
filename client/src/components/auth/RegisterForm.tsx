import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {z} from "zod";//this with react-hook-form will validate userInput //I don't think we have any restriction whether it is handled in front-end or back-end
import {useForm} from "react-hook-form";//handle formstate
import {zodResolver} from "@hookform/resolvers/zod";//resolve zod with react-hook-form
import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";

const registerSchema = z.object({
  username: z.string().min(5, "Username is required and must be at least 5 characters long"),//must have at least one character
  email: z.email("Email format not valid"),
  password: z.string().min(5, "Password is required and must be at least 5 characters long"),
  displayName: z.string().min(1, "Display name is required") //must have at least one character
});

type registerFormValues = z.infer<typeof registerSchema>

export function RegisterForm({className,...props}: React.ComponentProps<"div">) {
  const {registerFunc} = useAuthStore();
  const navigate = useNavigate();
  //register is part of useForm event
  //For register to work, in each input element we must state which attribute the input refer to
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<registerFormValues>({
    resolver: zodResolver(registerSchema)
  }); 

  //onSubmit => interact with backend
  const onSubmit = async (data: registerFormValues) => {
    const {username, email, password, displayName} = data;
      //call backend to register
      await registerFunc(username, password, email, displayName);
      //if successful, redirect to login
      navigate("/login");
    }
  //onSubmit to 
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                {/*Header*/}
                <div className="flex flex-col items-center text-center gap-2">
                  <a href="/" className="mx-auto block w-fit text-center"/>
                  <img src="/placeholder.png" alt="logo"></img>
                  <h1 className="text-2xl font-bold">Registration</h1>
                  <p className="text-muted-foreground text-balance">Register to start</p>
                  
                </div>
                {/* username*/}
                <div className="flex flex-col gap-3">
                  <Label htmlFor="username" className="block text-sm">Username</Label>
                  <Input type="text" id="username" placeholder="Please insert username here..." {...register("username")}/>
                  {errors.username &&  (
                    <p className="text-destructive text-sm"> {errors.username.message}</p>
                  )}
                  <p className="text-muted-foreground text-balance">Must have at least 5 characters</p>
                </div>
                <br></br>
                {/* email */}
                <div className="flex flex-col gap-3">
                  <Label htmlFor="email" className="block text-sm">Email</Label>
                  <Input type="email" id="email" placeholder="a@email.com" {...register("email")}/>
                  {errors.email &&  (
                    <p className="text-destructive text-sm"> {errors.email.message}</p>
                  )}
                </div>
                <br></br>
                {/*password*/}
                <div className="flex flex-col gap-3">
                  <Label htmlFor="password" className="block text-sm">Password</Label>
                  <Input type="password" id="password" {...register("password")}/>
                  <p className="text-muted-foreground text-balance">Must be longer than 5 characters</p>
                  {errors.password &&  (
                    <p className="text-destructive text-sm"> {errors.password.message}</p>
                  )}
                </div>
                {/* display name*/}

                <div className="flex flex-col gap-3">
                  <Label htmlFor="displayName" className="block text-sm">Display name</Label>
                  <Input type="text" id="displayName" placeholder="" {...register("displayName")}/>
                  {errors.displayName &&  (
                    <p className="text-destructive text-sm"> {errors.displayName.message}</p>
                  )}
                </div>

                <br></br>
                {/*Register Button */}
                <Button type="submit" className="w-full" disabled={isSubmitting}>Register now </Button> 
                {/*Link to login route */}
                <div className="text-center text-sm">
                  Already have account? {" "}
                  <a href="/login" className="underline underline-offset-4">Login here</a>
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