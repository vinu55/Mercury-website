import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SERVICES } from "@/lib/site-data";
import { submitEnquiry } from "@/lib/enquiries.functions";

export function EnquiryForm({ initialService = "" }: { initialService?:string }) {
 const submit = useServerFn(submitEnquiry); const [service,setService]=useState(initialService); const [state,setState]=useState<"idle"|"sending"|"sent"|"error">("idle");
 async function onSubmit(e:FormEvent<HTMLFormElement>){e.preventDefault();const formElement=e.currentTarget;setState("sending");const form=new FormData(formElement);try{await submit({data:{name:String(form.get("name")||""),company:String(form.get("company")||""),email:String(form.get("email")||""),phone:String(form.get("phone")||""),serviceInterest:service,message:String(form.get("message")||"")}});formElement.reset();setState("sent");}catch{setState("error");}}
 if(state==="sent") return <div className="flex min-h-96 flex-col items-center justify-center border border-border bg-muted p-10 text-center"><CheckCircle2 className="size-12 text-success"/><h2 className="mt-5 text-2xl font-semibold">Thank you. Your enquiry is received.</h2><p className="mt-2 text-muted-foreground">Our team will review it and get back to you.</p><Button variant="outline" className="mt-6" onClick={()=>setState("idle")}>Send another enquiry</Button></div>;
 return <form onSubmit={onSubmit} className="grid gap-5" aria-label="Enquiry form"><div className="grid gap-5 sm:grid-cols-2"><Field label="Name"><Input name="name" required minLength={2} /></Field><Field label="Company"><Input name="company" /></Field><Field label="Email"><Input name="email" type="email" required /></Field><Field label="Phone"><Input name="phone" type="tel" /></Field></div><Field label="Service interest"><Select required value={service} onValueChange={setService}><SelectTrigger className="h-12"><SelectValue placeholder="Select a solution" /></SelectTrigger><SelectContent>{SERVICES.map(s=><SelectItem key={s.href} value={s.title}>{s.title}</SelectItem>)}</SelectContent></Select></Field><Field label="How can we help?"><Textarea name="message" required minLength={10} className="min-h-40 resize-y" /></Field>{state==="error"&&<p role="alert" className="text-sm text-destructive">The form could not be sent. Please try again or contact us directly.</p>}<Button type="submit" size="lg" className="w-full sm:w-fit" disabled={state==="sending"||!service}>{state==="sending"?<><Loader2 className="animate-spin"/>Sending…</>:"Send enquiry"}</Button></form>
}
function Field({label,children}:{label:string;children:React.ReactNode}){return <div className="grid gap-2"><Label>{label}</Label>{children}</div>}
