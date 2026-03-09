import { useEffect, useMemo, useRef, useState } from "react";
import "./Pricing.css";

export default function Pricing() {

  const [billing,setBilling] = useState("yearly")
  const [page,setPage] = useState(0)
  const [isMobile,setIsMobile] = useState(false)

  const plans = useMemo(()=>[
    {
      id:"standard",
      name:"Standard",
      desc:"Manage up to 10 listings with essential features for small teams and businesses.",
      monthly:99,
      yearly:79,
      badge:"",
      features:[
        "10 Listing Per Login",
        "Up to 100 Users",
        "Enquiry on Listing",
        "24 Hrs Support",
        "Basic Custom Review",
        "Simple Impact Reporting",
        "Quick Onboarding & Account",
        "No API Access",
        "Basic Transaction Tracking",
        "Dreams Estate Branding"
      ]
    },
    {
      id:"professional",
      name:"Professional",
      desc:"Advanced tools & analytics to scale faster with bigger teams and higher volume.",
      monthly:199,
      yearly:159,
      badge:"Most Popular",
      features:[
        "50 Listing Per Login",
        "500+ Active Users",
        "Enquiry On Every Listing",
        "Priority 24 Hrs Support",
        "Advanced Custom Review",
        "Standard Impact Reporting",
        "Quick Onboarding & Account",
        "Partial API Access",
        "Basic Transaction Tracking",
        "Partial Custom Branding"
      ]
    },
    {
      id:"enterprise",
      name:"Enterprise",
      desc:"Unlimited listings, full API access, 24/7 support, and white-label branding.",
      monthly:399,
      yearly:319,
      badge:"",
      features:[
        "Unlimited Listings Per Login",
        "1000+ Active Users",
        "Enquiry Enabled On Listings",
        "Dedicated 24 Hrs Support",
        "Full Custom Review Tools",
        "Advanced Impact Reporting",
        "Personalized Onboarding & Account",
        "Full Api Access",
        "Full Transaction Tracking",
        "White-Label Branding"
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
            <h2>Pricing & Subscriptions</h2>
            <div className="pricingLine"/>
            <p>Checkout our package, choose your package wisely.</p>
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
                  <span className="pc-price">${priceOf(p)}</span>
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