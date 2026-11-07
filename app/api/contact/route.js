import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {


  try{

        const body = await request.json();
        const {email,name,message} = body;
        
        if(!name?.trim() || !email?.trim() || !message?.trim()){
            return NextResponse.json(
                {message: "Please enter each field"},
                {status: 400}
            );
        }
  
        const  { data,error}  = await resend.emails.send({
        from: 'Oviqo Team <info@send.oviqo.co.uk>',
        to: 'oviqo@hotmail.com',
        replyTo: email,
        subject:  `New OVIQO enquiry from ${name}`,
        text: `Name: ${name}
        
        Email: ${email} 
        
        Message:
        ${message}`,
        });
        if(error){
            console.error(error);
            
            return NextResponse.json(
            { error: 'Email could not be sent.' },
            { status: 500 }
        );
        }
        return NextResponse.json({success: true,});
        return NextResponse.json({message: "Email sent Successfully", id: data.data?.id});

    }catch(err)
    {
        return NextResponse.json({message: "Email not sent",error: err.message},{status: 500});
    }
}