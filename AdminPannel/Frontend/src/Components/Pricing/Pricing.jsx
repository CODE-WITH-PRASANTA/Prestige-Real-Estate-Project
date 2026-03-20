import { useEffect, useMemo, useRef, useState } from "react";
import "./Pricing.css";

export default function Pricing() {

  const [billing,setBilling] = useState("yearly")
  const [page,setPage] = useState(0)
  const [isMobile,setIsMobile] = useState(false)

  const plans = useMemo(()=>[
    {
      id:"standard",
      name:"Standard Plan",
      desc:"Perfect for individuals and small real estate agents managing a limited number of properties under Prestige Real Estate Properties.",
      monthly:4999,
      yearly:3999,
      badge:"",
      features:[
        "10 Property Listings",
        "Up to 100 Buyers/Users",
        "Basic Property Enquiry System",
        "Email Support (24 Hrs)",
        "Simple Listing Management",
        "Basic Performance Insights",
        "Quick Account Setup",
        "No API Access",
        "Standard Transaction Records",
        "Prestige Branding Included"
      ]
    },
    {
      id:"professional",
      name:"Professional Plan",
      desc:"Best suited for growing real estate businesses looking to scale property listings and generate more leads efficiently.",
      monthly:9999,
      yearly:7999,
      badge:"Most Popular",
      features:[
        "50 Property Listings",
        "500+ Active Buyers",
        "Advanced Enquiry Management",
        "Priority Customer Support",
        "Detailed Property Reviews",
        "Standard Analytics Dashboard",
        "Faster Onboarding Process",
        "Partial API Integration",
        "Transaction Tracking",
        "Custom Branding Options"
      ]
    },
    {
      id:"enterprise",
      name:"Enterprise Plan",
      desc:"Designed for large-scale real estate developers and agencies managing premium projects like Prestige Real Estate Properties with complete control.",
      monthly:19999,
      yearly:15999,
      badge:"",
      features:[
        "Unlimited Property Listings",
        "1000+ Active Users",
        "Full Enquiry Automation",
        "Dedicated Account Manager",
        "Advanced Review & CRM Tools",
        "In-depth Analytics & Reports",
        "Personalized Setup & Support",
        "Full API Access",
        "Complete Transaction Monitoring",
        "White-label Branding"
      ]
    }
  ],[])

  const priceOf = (p)=> billing==="yearly"?p.yearly:p.monthly

  useEffect(()=>{

    const checkMobile = ()=> setIsMobile(window.innerWidth <= 768)

    checkMobile()

    window.addEventListener("resize",checkMobile)

    return ()=>window.removeEventListener("resize",checkMobile)

  },[])

  const prev = ()=> setPage(p=>Math.max(0,p-1))
  const next = ()=> setPage(p=>Math.min(plans.length-1,p+1))

  const drag = useRef({down:false,x:0})

  const onDown = e=>{
    if(!isMobile) return
    drag.current.down=true
    drag.current.x=e.clientX || e.touches?.[0].clientX
  }

  const onUp = e=>{
    if(!isMobile) return
    if(!drag.current.down) return

    drag.current.down=false

    const end=e.clientX || e.changedTouches?.[0].clientX
    const diff=drag.current.x-end

    if(diff>60) next()
    if(diff<-60) prev()
  }

  return (
    <section className="pricing">

      <div className="priceWrap">

        <div className="pricingTop">

          <div>
            <h2>Prestige Real Estate Properties Pricing Plans</h2>
            <div className="pricingLine"/>
            <p>
              Explore flexible pricing options designed for modern real estate professionals. 
              Whether you're managing a few listings or handling large-scale property portfolios, 
              our plans help you grow faster with better visibility and lead generation.
            </p>
          </div>

          <div className="billingToggle">

            <span className={billing==="yearly"?"active":""}>Yearly</span>

            <button
              className={`switch ${billing==="monthly"?"on":""}`}
              onClick={()=>setBilling(b=>b==="yearly"?"monthly":"yearly")}
            >
              <span className="knob"/>
            </button>

            <span className={billing==="monthly"?"active":""}>Monthly</span>

          </div>

        </div>

        <div
          className="priceSlider"
          onMouseDown={onDown}
          onMouseUp={onUp}
          onTouchStart={onDown}
          onTouchEnd={onUp}
        >

          {isMobile && (
            <button className="priceNav left" onClick={prev}>‹</button>
          )}

          <div
            className="priceTrack"
            style={{
              transform: isMobile ? `translateX(-${page*100}%)` : "none"
            }}
          >

            {plans.map((p)=>(
              <article key={p.id} className="priceCard">

                {p.badge && <div className="pc-badge">{p.badge}</div>}

                <h3 className="pc-name">{p.name}</h3>
                <p className="pc-desc">{p.desc}</p>

                <div className="pc-priceRow">
                  <span className="pc-price">₹{priceOf(p)}</span>
                  <span className="pc-per">/month</span>
                </div>

                <div className="pc-divider"/>

                <div className="pc-features">

                  <h4>Key Features</h4>

                  <ul>
                    {p.features.map((f,i)=>(
                      <li key={i}>
                        <span className="check">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                </div>

                <button className="pc-btn">Get a Quote</button>

              </article>
            ))}

          </div>

          {isMobile && (
            <button className="priceNav right" onClick={next}>›</button>
          )}

        </div>

        {isMobile && (
          <div className="priceDots">
            {plans.map((_,i)=>(
              <span
                key={i}
                className={i===page?"dot active":"dot"}
                onClick={()=>setPage(i)}
              />
            ))}
          </div>
        )}

      </div>

    </section>
  )
}