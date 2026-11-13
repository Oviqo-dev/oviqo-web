'use client';

import Image from 'next/image';
import Link from 'next/link';
import FloatingHeader from "../../components/navBar";
import { CheckIcon, MinusIcon } from "@heroicons/react/24/solid";

const TABLE_HEAD = ["Features", "Growth", "Scale", "Enterprise"];

const TABLE_ROWS = [
  { feature: "Unlimited users",     growth: true,  scale: true,  enterprise: true },
  { feature: "Unlimited projects",  growth: true,  scale: true,  enterprise: true },
  { feature: "Unlimited storage",   growth: true,  scale: true,  enterprise: true },
  { feature: "Email support",       growth: true,  scale: true,  enterprise: true },
  { feature: "Priority support",    growth: true,  scale: true,  enterprise: true },
  { feature: "Account manager",     growth: false, scale: true,  enterprise: true },
  { feature: "Reporting",  growth: false, scale: true,  enterprise: true },
  { feature: "Custom branding",    growth: false, scale: false, enterprise: true },
  { feature: "Specialised training",    growth: false, scale: false, enterprise: true },
];

function Cell({ value }: { value: boolean }) {
  return value ? (
    <CheckIcon className="h-5 w-5 text-[#9d96e9] mx-auto" aria-label="Included" />
  ) : (
    <MinusIcon className="h-5 w-5 text-gray-300 mx-auto" aria-label="Not included" />
  );
}


export default function Plans() {
  
    
    return(
        <>
        <FloatingHeader/>
      <main className="flex-1 flex mt-3 mx-auto flex-col w-full max-w-7xl justify-between">
             

        <section className="bg-white flex-1 h-full" id="solution">
          <div className="p-2 pt-0 text-left text-black h-auto">
            <div className="flex">
              <div className="text-left mb-8 ml-4 width-half flex-1">
              <h1 className="text-3xl font-bold">Ready to build your government contract pipeline.</h1>
              </div>
            
              {/*<div className="flex-1 text-right text-gray-500 max-w-80 pr-5">Simple and transparent plans to help you win the contract, with support from our team every step of the way.</div>*/}
            </div> 


            <div className="md:flex-row md:flex p-2 pt-0 h-auto min-h-120 sm:flex-col">
              <div className="flex-1 flex flex-col bg-[#f6f6f6] m-2 rounded-lg text-left h-auto p-4 text-3xl font-semibold">
                Included in all tiers
                <p className="text-sm mt-42 text-[#9d96e9]">Features</p>
                <ul>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Unlimited users</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Unlimited projects</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Unlimited storage</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Email support</li>                
                </ul>
                
              </div>
              <div className="flex-1 bg-[#f6f6f6] m-2 rounded-lg text-left h-auto p-4 text-3xl font-semibold">
                Growth
                <p className="text-sm mt-1 text-[#9d96e9]">Features</p>  
                <ul>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Priority support</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Custom integrations</li>
                </ul>

                <div className=" flex flex-col items-start gap-3 w-full mt-46">
                  <div className="flex items-baseline gap-1 text-left">
                    <span className="text-3xl font-bold text-black">£499</span>
                    <span className="text-sm font-normal text-gray-600">per month</span>
                  </div>

                  <div className="flex flex-col text-center items-center justify-between min-w-[95%]">
                  
                  <Link
                    href="/contact"
                    className="rounded-full border border-[#9d96e9] bg-[#9d96e9] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#8b84dd] w-[95%]"
                  >
                    Book a Call
                  </Link>
                </div>
                </div>

               
              </div>

              <div className="flex-1 flex flex-col bg-[#f6f6f6] m-2 rounded-lg text-left h-auto p-4 text-3xl font-semibold">
                Scale
                <p className="text-sm mt-1 text-[#9d96e9]">Features</p>  
                <ul>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Everything in growth</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Account manager</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Advanced reporting</li>
                </ul>

                <div className=" flex flex-col items-start gap-3 w-full mt-37">
                  <div className="flex items-baseline gap-1 text-left">
                    <span className="text-3xl font-bold text-black">£999</span>
                    <span className="text-sm font-normal text-gray-600">per month</span>
                  </div>

                  <div className="flex flex-col text-center items-center justify-between min-w-[95%]">
                  
                  <Link
                    href="/contact"
                    className="rounded-full border border-[#9d96e9] bg-[#9d96e9] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#8b84dd] w-95/100"
                  >
                    Book a Call
                  </Link>
                </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col bg-[#f6f6f6] m-2 rounded-lg text-left h-auto p-4 text-3xl font-semibold">
                Enterprise
                <p className="text-sm mt-1 mb-0 pb-0 text-[#9d96e9]">Features</p>  
              
                <ul className="mt-0 pt-0">
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Everything in scale</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Custom solutions</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>On-site training</li>
                </ul>

                <div className=" flex flex-col items-start gap-3 w-full mt-37">
                  <div className="flex items-baseline gap-1 text-left">
                    <span className="text-3xl font-bold text-black">Contact</span>
                    
                  </div>

                <div className="flex flex-col items-baseline text-center  justify-between min-w-[95%] ">
                  
                  <Link
                    href="/contact"
                    className="rounded-full border border-[#9d96e9] bg-[#9d96e9] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#8b84dd] w-[95%]"
                  >
                    Book a Call
                  </Link>
                </div>
                </div>


              </div>
            </div>
          </div>

          <h1 className='text-center text-black mt-5 text-3xl font-semibold mb-3'>Compare features</h1>
          <div className='flex p-2 pl-6 pr-6 max-w-7xl'>

            <div className="w-full overflow-x-auto rounded-lg ">
              <table className="w-full table-auto text-left min-w-130">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, i) => (
                      <th
                        key={head}
                        scope="col"
                        className={`border-b border-gray-200 bg-[#f6f6f6] p-3 text-xs font-bold text-gray-900 sm:p-4 sm:text-sm ${
                          i === 0
                            ? "sticky left-0 z-20 shadow-[2px_0_0_0_#e5e7eb]"
                            : "text-center"
                        }`}
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                {TABLE_ROWS.map(({ feature, growth, scale, enterprise }, index) => {
                  const bg = index % 2 === 0 ? "bg-white" : "bg-[#fafafa]";
                  return (
                    <tr key={feature} className={bg}>
                      <td
                        className={`sticky left-0 z-10 p-3 text-xs font-medium text-gray-900 shadow-[2px_0_0_0_#e5e7eb] sm:p-4 sm:text-sm ${bg}`}
                      >
                        {feature}
                      </td>
                      <td className="p-3 text-center sm:p-4"><Cell value={growth} /></td>
                      <td className="p-3 text-center sm:p-4"><Cell value={scale} /></td>
                      <td className="p-3 text-center sm:p-4"><Cell value={enterprise} /></td>
                    </tr>
                  );
                })}
              </tbody>
              </table>
            </div>
            

            
          </div>
        </section>
        

      </main>
          <footer className="py-6 text-center text-xs text-gray-900 bg-white">
            <p>© 2026 OVIQO. All rights reserved.</p>
            <p>Developed by Adl &amp; Ahad.</p>
        </footer>
        
      
    
    </>
  );
}