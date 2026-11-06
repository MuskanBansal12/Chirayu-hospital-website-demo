"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Accessibility, Clock3, MapPin, Menu, Phone, X, ParkingCircle, Stethoscope, Waves, HeartPulse, Plus, MoveUpRight } from "lucide-react";

const PHONE = "09887021645";
const ADDRESS = "29, Town-Junction Road, near HDFC Bank, Hanumangarh, Rajasthan 335512";
const photos = [
  { title: "A calm clinical environment", type: "Spaces", src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=85" },
  { title: "A welcoming reception", type: "Spaces", src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=85" },
  { title: "Care and consultation", type: "Care", src: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1400&q=85" },
  { title: "Modern healthcare setting", type: "Spaces", src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1400&q=85" },
  { title: "Healthcare professionals", type: "Care", src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85" },
  { title: "A thoughtful patient space", type: "Care", src: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1400&q=85" },
];

function Header() {
  const [menu, setMenu] = useState(false);
  const links = [["The hospital", "#about"], ["Areas of care", "#care"], ["Gallery", "#gallery"], ["Visit us", "#visit"]];
  return <>
    <div className="announcement"><span className="announcement-dot"/> HOSPITAL OPEN 24 HOURS <span className="announcement-line"/> HANUMANGARH, RAJASTHAN <a href={`tel:${PHONE}`}>CALL 098870 21645 <ArrowUpRight size={13}/></a></div>
    <header className="site-header"><a href="#home" className="wordmark"><span className="wordmark-symbol"><Activity size={22}/></span><span>CHIRAYU <b>SWASTHYA</b><small>GASTRO & LIVER HOSPITAL</small></span></a>
      <nav className="main-nav">{links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav>
      <a className="header-cta" href="#enquire">Make an enquiry <MoveUpRight size={15}/></a>
      <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X/> : <Menu/>}</button>
    </header>
    <AnimatePresence>{menu && <motion.nav className="mobile-menu" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}>{links.map(([label,href])=><a key={label} href={href} onClick={()=>setMenu(false)}>{label}<ArrowUpRight size={15}/></a>)}<a href="#enquire" onClick={()=>setMenu(false)}>Make an enquiry <ArrowUpRight size={15}/></a></motion.nav>}</AnimatePresence>
  </>;
}

function QuickFacts() {
  const facts = [
    { icon: Clock3, label: "HOSPITAL HOURS", value: "Open 24 hours", detail: "Every day" },
    { icon: Accessibility, label: "ACCESSIBILITY", value: "Wheelchair access", detail: "Entrance & exit" },
    { icon: ParkingCircle, label: "PARKING", value: "Accessible parking", detail: "For visitors" },
    { icon: Phone, label: "RECEPTION", value: "098870 21645", detail: "Call the hospital" },
  ];
  return <section className="quick-facts" aria-label="Hospital quick information">{facts.map(({icon:Icon,label,value,detail},i)=><motion.a href={i===3?`tel:${PHONE}`:"#visit"} className="quick-fact" key={label} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08,duration:.5}}><span className="quick-fact-icon"><Icon size={19}/></span><span className="quick-fact-copy"><small>{label}</small><b>{value}</b><em>{detail}</em></span><ArrowUpRight className="quick-fact-arrow" size={15}/></motion.a>)}</section>;
}

function Gallery() {
  const [filter,setFilter] = useState("All"); const [selected,setSelected] = useState(null);
  const items = filter === "All" ? photos : photos.filter(p=>p.type===filter);
  const step = (n) => { const i=photos.indexOf(selected); setSelected(photos[(i+n+photos.length)%photos.length]); };
  return <>
    <div className="gallery-controls"><div className="gallery-tabs">{["All","Spaces","Care"].map(t=><button key={t} className={filter===t?"chosen":""} onClick={()=>setFilter(t)}>{t}</button>)}</div><span>{String(items.length).padStart(2,"0")} / 06 VISUALS</span></div>
    <div className="editorial-gallery">{items.map((p,i)=><motion.button layout key={p.src} className={`gallery-tile tile-${i%4}`} onClick={()=>setSelected(p)} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5,delay:i*.06}}><img src={p.src} alt={p.title}/><span className="tile-caption"><small>{p.type}</small><b>{p.title}</b><i><ArrowUpRight size={18}/></i></span></motion.button>)}</div>
    <AnimatePresence>{selected&&<motion.div className="gallery-viewer" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}><button className="viewer-close" onClick={()=>setSelected(null)}><X/></button><button className="viewer-arrow left" onClick={e=>{e.stopPropagation();step(-1)}}><ArrowLeft/></button><motion.div className="viewer-image" onClick={e=>e.stopPropagation()}><img src={selected.src} alt={selected.title}/><p>{selected.title}</p></motion.div><button className="viewer-arrow right" onClick={e=>{e.stopPropagation();step(1)}}><ArrowRight/></button></motion.div>}</AnimatePresence>
  </>;
}

function Enquiry() {
 const [data,setData]=useState({name:"",phone:"",topic:"General enquiry"});
 const update=e=>setData({...data,[e.target.name]:e.target.value});
 const submit=e=>{e.preventDefault();const msg=`Hello Chirayu Swasthya Hospital, I have an enquiry. Name: ${data.name}. Phone: ${data.phone}. Topic: ${data.topic}.`;window.open(`https://wa.me/91${PHONE}?text=${encodeURIComponent(msg)}`,"_blank","noopener,noreferrer");};
 return <form className="enquiry-form" onSubmit={submit}><label>Your name<input name="name" value={data.name} onChange={update} placeholder="Full name" required/></label><label>Mobile number<input name="phone" value={data.phone} onChange={update} placeholder="10-digit mobile number" type="tel" pattern="[0-9+ -]{10,15}" required/></label><label className="wide-field">What would you like to ask about?<select name="topic" value={data.topic} onChange={update}><option>General enquiry</option><option>Gastroenterology</option><option>Liver health</option><option>Hospital facilities</option><option>Other</option></select></label><button className="send-enquiry" type="submit">Continue on WhatsApp <ArrowUpRight size={17}/></button><p className="form-disclaimer">This creates a WhatsApp message for the hospital. Your visit or appointment is not confirmed until the hospital responds.</p></form>;
}

function FAQ() {
  const [active,setActive] = useState(0);
  const items = [
    ["Is the hospital open at night?", "The hospital listing says it is open 24 hours. Call 098870 21645 to confirm the right point of contact before travelling."],
    ["Does the hospital have wheelchair access?", "Wheelchair-accessible car parking and an accessible entrance and exit are listed as facilities."],
    ["How can I ask about an appointment?", "Call the hospital at 098870 21645 or use the enquiry form on this website to prepare a WhatsApp message."],
    ["Where is the hospital located?", "The address is 29, Town-Junction Road, near HDFC Bank, Hanumangarh, Rajasthan 335512. Use the directions link in the Visit Us section."],
  ];
  return <section className="faq-section"><div className="faq-intro"><div className="section-marker">08 / QUICK ANSWERS</div><p className="overline">HERE TO HELP</p><h2>A few things<br/>you may <em>wonder.</em></h2><p>Useful visitor information before you get in touch or plan your visit.</p><a href={`tel:${PHONE}`} className="underlined-link">Still have a question? Call us <ArrowUpRight size={16}/></a></div><div className="faq-list">{items.map(([q,a],i)=><div className={`faq-item ${active===i?"faq-active":""}`} key={q}><button onClick={()=>setActive(active===i?-1:i)} aria-expanded={active===i}><span className="faq-number">0{i+1}</span><b>{q}</b><span className="faq-toggle"><Plus size={17}/></span></button><AnimatePresence initial={false}>{active===i&&<motion.div className="faq-answer" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.28}}><p>{a}</p></motion.div>}</AnimatePresence></div>)}</div></section>;
}

export default function HospitalSite() {
 return <main id="home" className="site-redesign">
  <Header/>
  <section className="split-hero" id="top">
    <div className="split-hero-visual">
      <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1800&q=90" alt="Illustrative modern healthcare interior"/><div className="visual-grain"/>
      <div className="visual-topline"><span>CHIRAYU SWASTHYA</span><span>HANUMANGARH · RAJASTHAN</span></div>
      <motion.div className="visual-caption" initial={{opacity:0,x:-25}} animate={{opacity:1,x:0}} transition={{delay:.35,duration:.8}}><span className="caption-kicker">A PLACE FOR CARE</span><b>Thoughtful spaces.<br/><em>Focused care.</em></b></motion.div>
      <div className="visual-index">01 <span/> HOSPITAL & CARE</div>
      <motion.div className="hero-orbit-badge" animate={{rotate:360}} transition={{duration:28,repeat:Infinity,ease:"linear"}}><span>CHIRAYU · SWASTHYA · CARE ·</span><i>✳</i></motion.div>
    </div>
    <div className="split-hero-panel"><div className="panel-topline"><span className="live-dot"/> OPEN 24 HOURS <span className="panel-topline-rule"/> GASTRO & LIVER HOSPITAL</div><div className="panel-main"><p className="overline">DIGESTIVE & LIVER CARE</p><h1>Care that<br/>keeps you<br/><em>moving</em><span>.</span></h1><p className="panel-description">A dedicated hospital in Hanumangarh for people seeking information and support related to gastroenterology and liver health.</p><div className="panel-actions"><a href="#enquire" className="panel-primary">Make an enquiry <ArrowUpRight size={17}/></a><a href={`tel:${PHONE}`} className="panel-secondary"><Phone size={16}/> 098870 21645</a></div></div><div className="panel-bottom"><div><small>FIND US</small><b>Town-Junction Road</b></div><div><small>VISITOR ACCESS</small><b>Wheelchair accessible</b></div><a href="#explore" aria-label="Scroll to explore"><ArrowDown size={20}/></a></div><span className="panel-watermark">CS</span></div>
  </section>
  <QuickFacts/>
  <section className="ticker" aria-label="Hospital information"><div className="ticker-track"><span>OPEN 24 HOURS <b>✳</b> PATIENT ACCESSIBILITY <b>✳</b> GASTRO & LIVER CARE <b>✳</b> HANUMANGARH, RAJASTHAN <b>✳</b> OPEN 24 HOURS <b>✳</b> PATIENT ACCESSIBILITY <b>✳</b></span></div></section>
  <section className="story-spread" id="about"><div className="story-rail"><span>02 / THE HOSPITAL</span><span className="rail-line"/><span>ABOUT CHIRAYU</span></div><div className="story-content" id="explore"><p className="overline">A LOCAL ADDRESS FOR SPECIALISED CARE</p><h2>Good care begins<br/>with <em>being heard.</em></h2><div className="story-lower"><p>Chirayu Swasthya Gastro & Liver Hospital is located on Town-Junction Road in Hanumangarh. This website brings together essential visitor information, accessibility details and ways to contact the hospital.</p><a href="#visit" className="story-link">GET DIRECTIONS <ArrowUpRight size={16}/></a></div></div><div className="story-photo-stack"><div className="story-photo-main"><img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85" alt="Illustrative hospital reception"/><span>01 — A WELCOMING ENVIRONMENT</span></div><div className="story-photo-small"><img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=85" alt="Illustrative healthcare professional"/></div><div className="story-photo-note"><Activity size={22}/><span>GASTRO<br/>& LIVER<br/>HOSPITAL</span></div></div></section>
  <section className="pathway-section" id="care"><div className="pathway-head"><div><span className="section-marker light-marker">03 / AREAS OF CARE</span><p className="overline">EXPLORE THE FOCUS</p><h2>Start with<br/><em>what matters.</em></h2></div><p className="pathway-intro">Choose a topic to prepare an enquiry. Contact the hospital to confirm available consultations, services and procedures.</p></div><div className="pathway-layout"><div className="pathway-list"><a href="#enquire" className="pathway-item"><span className="pathway-num">01</span><span className="pathway-symbol"><Waves/></span><span className="pathway-text"><b>Gastroenterology</b><small>Digestive health information and enquiries</small></span><span className="pathway-go"><ArrowUpRight/></span></a><a href="#enquire" className="pathway-item"><span className="pathway-num">02</span><span className="pathway-symbol"><Activity/></span><span className="pathway-text"><b>Liver health</b><small>Information about liver-related care</small></span><span className="pathway-go"><ArrowUpRight/></span></a><a href="#enquire" className="pathway-item"><span className="pathway-num">03</span><span className="pathway-symbol"><Stethoscope/></span><span className="pathway-text"><b>Patient consultation</b><small>Ask about consultation options</small></span><span className="pathway-go"><ArrowUpRight/></span></a></div><motion.aside className="pathway-aside" initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><div className="aside-orbit"><HeartPulse size={28}/></div><span>NEED HELP CHOOSING?</span><h3>Talk to the<br/><em>hospital team.</em></h3><p>Call the reception for information about your enquiry and the next steps.</p><a href={`tel:${PHONE}`}>CALL 098870 21645 <ArrowUpRight size={15}/></a></motion.aside></div></section>
  <section className="access-band"><div className="access-band-heading"><span className="section-marker">04 / ACCESSIBILITY</span><p className="overline">MAKING THE VISIT EASIER</p><h2>Access is part<br/>of <em>good care.</em></h2></div><div className="access-band-images"><div className="access-band-img access-img-one"><img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=85" alt="Illustrative hospital interior"/><span>WELCOME</span></div><div className="access-band-img access-img-two"><img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=85" alt="Illustrative healthcare space"/><span>SUPPORT</span></div></div><div className="access-band-details"><p>The hospital listing identifies these visitor facilities:</p><div className="access-detail"><span><ParkingCircle/></span><b>Wheelchair-accessible car parking</b><ArrowUpRight size={16}/></div><div className="access-detail"><span><Accessibility/></span><b>Wheelchair-accessible entrance & exit</b><ArrowUpRight size={16}/></div><a href={`tel:${PHONE}`} className="access-call">Call ahead for visitor information <Phone size={15}/></a></div></section>
  <section className="care-marquee"><div className="care-marquee-inner"><span>GASTROENTEROLOGY</span><b>✳</b><span>LIVER HEALTH</span><b>✳</b><span>PATIENT SUPPORT</span><b>✳</b><span>GASTROENTEROLOGY</span><b>✳</b><span>LIVER HEALTH</span><b>✳</b></div></section>
  <section className="gallery-stage" id="gallery"><div className="gallery-stage-top"><div><span className="section-marker light-marker">05 / THE GALLERY</span><p className="overline">A VISUAL IMPRESSION</p><h2>Inside the world<br/>of <em>care.</em></h2></div><div className="gallery-stage-note"><span>SCROLL · EXPLORE · DISCOVER</span><p>Illustrative healthcare photography for this first website version. These are not verified photographs of the hospital.</p></div></div><Gallery/></section>
  <section className="enquiry-ribbon" id="enquire"><div className="enquiry-ribbon-copy"><span className="section-marker light-marker">06 / GET IN TOUCH</span><p className="overline">HAVE A QUESTION?</p><h2>Let's make the<br/>next step <em>simple.</em></h2><p>Send an enquiry through WhatsApp or call the hospital directly. The team can help with visitor and service information.</p><div className="ribbon-phone"><Phone size={17}/><a href={`tel:${PHONE}`}>098870 21645</a></div></div><div className="enquiry-ribbon-form"><div className="form-heading"><span>WHATSAPP ENQUIRY</span><b>How can we help?</b></div><Enquiry/></div><div className="ribbon-decoration">HELLO</div></section>
  <FAQ/>
  <section className="destination-section" id="visit"><div className="destination-header"><span className="section-marker">07 / FIND US</span><span className="destination-open"><i/> OPEN 24 HOURS</span></div><div className="destination-map"><iframe title="Map to Chirayu Swasthya Hospital" src="https://maps.google.com/maps?q=29%2C%20Town-Junction%20Road%2C%20Hanumangarh%2C%20Rajasthan%20335512&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy"/><div className="destination-card"><p className="overline">YOUR DESTINATION</p><h2>Find your way<br/>to <em>Chirayu.</em></h2><div className="destination-address"><MapPin size={18}/><p>{ADDRESS}</p></div><div className="destination-meta"><span><Clock3 size={16}/><b>Open 24 hours</b></span><span><Phone size={16}/><b>098870 21645</b></span></div><a className="destination-directions" href="https://www.google.com/maps/search/?api=1&query=Chirayu+Swasthya+Gastro+%26+Liver+Hospital+Hanumangarh+Rajasthan" target="_blank" rel="noreferrer">OPEN IN GOOGLE MAPS <ArrowUpRight size={16}/></a></div></div></section>
  <footer className="site-footer"><div className="footer-top"><a href="#home" className="wordmark footer-wordmark"><span className="wordmark-symbol"><Activity size={22}/></span><span>CHIRAYU <b>SWASTHYA</b><small>GASTRO & LIVER HOSPITAL</small></span></a><p>Thoughtful access to hospital information and patient support in Hanumangarh, Rajasthan.</p><a href={`tel:${PHONE}`} className="footer-phone"><Phone size={16}/> 098870 21645</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} CHIRAYU SWASTHYA GASTRO & LIVER HOSPITAL</span><a href="#home">BACK TO TOP ↑</a><span>HANUMANGARH · RAJASTHAN</span></div></footer>
  <a href={`tel:${PHONE}`} className="floating-call" aria-label="Call hospital"><Phone size={18}/><span>CALL HOSPITAL</span></a>
 </main>;
}
