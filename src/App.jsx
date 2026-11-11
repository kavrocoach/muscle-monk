import React, { useEffect, useState } from 'react';

const WHATSAPP_NUMBER = '918892220980';

const services = [
  { id: 'hundred-days', number: '01', title: '100 Days Challenge', duration: '100 Days', text: 'Commit to 100 focused days and see how far discipline can take your body and energy.', before: `${import.meta.env.BASE_URL}new/1-before.jpeg`, after: `${import.meta.env.BASE_URL}new/1-after.jpeg` },
  { id: 'three-month', number: '02', title: 'Three Months Transformation', duration: '3 Months', text: 'A visible 90-day body change built on structured training, smart nutrition, and daily consistency.', image: `${import.meta.env.BASE_URL}new/combined-8.jpeg` },
  { id: 'six-month', number: '03', title: '6 Month Transformation', duration: '6 Months', text: 'Six months of guided workouts and nutrition for lasting fat loss, strength, and confidence.', before: `${import.meta.env.BASE_URL}new/4-before.jpeg`, after: `${import.meta.env.BASE_URL}new/4-after.jpeg` },
  { id: 'fat-reduction', number: '04', title: 'Over Fat Reduction in 6 Months', duration: '6 Months', text: 'Reduce stubborn body fat over six months with a plan built around your lifestyle.', before: `${import.meta.env.BASE_URL}new/2-before.jpeg`, after: `${import.meta.env.BASE_URL}new/2-after.jpeg` },
  { id: 'weight-loss', number: '05', title: 'Weight Loss', duration: 'Personalised', text: 'Drop unwanted weight, improve fitness, and feel lighter and more confident every week.', image: `${import.meta.env.BASE_URL}new/combined-5.jpeg` },
  { id: 'weight-gain', number: '06', title: 'Weight Gain', duration: 'Personalised', text: 'Gain healthy weight and lean muscle with progressive training and a calorie-smart meal plan.', image: `${import.meta.env.BASE_URL}new/combined-9.jpeg` },
  { id: 'pcod-pcos', number: '07', title: 'PCOD PCOS', duration: 'Personalised', text: 'Fitness and nutrition guidance for sustainable fat loss and a toned body with PCOD/PCOS. Not a medical treatment.', before: `${import.meta.env.BASE_URL}new/3-before.jpeg`, after: `${import.meta.env.BASE_URL}new/3-after.jpeg` },
];

const values = [
  ['K', 'Knowledge', 'Expert fitness guidance'],
  ['A', 'Action', 'Consistent workouts'],
  ['V', 'Vitality', 'Healthy, energetic living'],
  ['R', 'Results', 'Progress toward your goals'],
  ['O', 'Optimization', 'A better performing you'],
];

export default function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  useEffect(() => {
    if (!selectedService) return undefined;
    const onKeyDown = (event) => { if (event.key === 'Escape') setSelectedService(null); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedService]);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || !selectedService) return;
    if (form.elements.website.value) return;
    const values = new FormData(form);
    const photo = values.get('photo');
    const message = `Hello KAVRO,\n\nI would like to enquire about your fitness coaching program.\n\nName: ${values.get('full_name')}\nEmail: ${values.get('email')}\nAge: ${values.get('age')}\nPhone: ${values.get('phone_number')}\nCountry: ${values.get('country')}\nCity: ${values.get('city')}\nGender: ${values.get('gender')}\nPreferred Workout Time: ${values.get('preferred_workout_time')}\n\nSelected Service: ${selectedService.title}\nProgram Duration: ${selectedService.duration}\nCurrent Weight: ${values.get('weight_kg')} kg\nHeight: ${values.get('height_cm')} cm\n\nTransformation Goal:\n${values.get('transformation_reason')}\n\nAdditional Message:\n${values.get('additional_message') || 'None'}\n\nCurrent Body Photo: ${photo?.name ? `${photo.name} (please attach it in WhatsApp)` : 'Not provided'}\n\nI agree to share my details for fitness consultation and follow-up. Please contact me about the next steps.\n\nThank you.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setWhatsappUrl(url);
    const whatsappWindow = window.open(url, '_blank');
    if (whatsappWindow) whatsappWindow.opener = null;
    setSubmitted(true);
    form.reset();
  }

  return (
    <>
      <header className="site-header"><a className="brand" href="#about"><span className="brand-mark">K</span><span className="brand-text"><span>KAVRO<span className="brand-period">.</span></span><small className="brand-sub">Muscle Monk</small></span></a><nav><a href="#services" className="nav-cta">View programs<span>→</span></a></nav></header>
      <main>
        <section className="values-strip" id="about">
          <div className="values-intro"><span>THE KAVRO METHOD</span><p>Five principles. <br />One stronger you.</p></div>
          {values.map(([letter, title, text]) => <div className="value-item" key={letter}><span className="value-letter">{letter}</span><div><strong>{title}</strong><small>{text}</small></div></div>)}
        </section>

        <section className="services section-wrap" id="services">
          <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> OUR PROGRAMS</p><h2>Choose your <em>goal.</em></h2></div><p className="section-aside">Select a program to tell us about yourself. We’ll open WhatsApp with your details and selected service ready to send.</p></div>
          <div className="service-grid">{services.map((service) => <button type="button" className="service-card" key={service.id} onClick={() => { setSelectedService(service); setSubmitted(false); setWhatsappUrl(''); }} aria-label={`Select ${service.title}`}><span className={`service-photo${service.before ? ' is-pair' : ''}`} style={service.before ? undefined : { backgroundImage: `url("${service.image}")` }} role="img" aria-label={`${service.title} fitness program`}>{service.before && <><span className="pair-half" style={{ backgroundImage: `url("${service.before}")` }}><em>BEFORE</em></span><span className="pair-half" style={{ backgroundImage: `url("${service.after}")` }}><em>AFTER</em></span></>}{!service.before && <><em className="photo-tag photo-tag-left">BEFORE</em><em className="photo-tag photo-tag-right">AFTER</em></>}<span className="service-number">{service.number}</span></span><span className="service-copy"><strong>{service.title}</strong><span>{service.text}</span><span className="service-select">Select &amp; enquire <i>→</i></span></span></button>)}</div>
        </section>

        {selectedService && <div className="enquiry-modal" role="dialog" aria-modal="true" aria-label={`Enquiry for ${selectedService.title}`} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedService(null); }}><div className="enquiry-sheet"><button type="button" className="enquiry-close" onClick={() => setSelectedService(null)} aria-label="Close enquiry">×</button>{submitted ? <div className="enquiry-success" role="status"><div className="success-mark">✓</div><p className="eyebrow">ENQUIRY READY</p><h3>Your enquiry is ready.</h3><p>WhatsApp is ready with your details. Press Send there to message the trainer. If it did not open, use the button below.</p><a className="button button-dark" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Continue to WhatsApp <span>↗</span></a><button className="text-link modal-back" type="button" onClick={() => setSubmitted(false)}>Back to form</button></div> : <><div className="form-heading"><div><span className="form-kicker">KAVRO / PROGRAM ENQUIRY</span><h3>Tell us about yourself</h3></div><span className="required-note">* REQUIRED</span></div><div className="selected-program"><span>SELECTED SERVICE</span><strong>{selectedService.title}</strong></div><form onSubmit={handleSubmit}><div className="form-grid"><label>Full name <span>*</span><input name="full_name" type="text" placeholder="Your full name" autoComplete="name" minLength="2" maxLength="120" required /></label><label>Email address <span>*</span><input name="email" type="email" placeholder="you@example.com" autoComplete="email" maxLength="254" required /></label><label>Age <span>*</span><input name="age" type="number" placeholder="e.g. 28" min="10" max="90" required /></label><label>Phone number <span>*</span><input name="phone_number" type="tel" placeholder="+91 98765 43210" autoComplete="tel" pattern="\+?[0-9\s()\-]{7,18}" required /></label><label>Country <span>*</span><input name="country" type="text" autoComplete="country-name" defaultValue="India" required /></label><label>City <span>*</span><input name="city" type="text" placeholder="Your city" autoComplete="address-level2" required /></label><label>Gender <span>*</span><select name="gender" defaultValue="" required><option value="" disabled>Select an option</option><option>Male</option><option>Female</option><option>Prefer not to say</option></select></label><label>Current weight (kg) <span>*</span><input name="weight_kg" type="number" step="0.1" placeholder="e.g. 68" min="20" max="300" required /></label><label>Height (cm) <span>*</span><input name="height_cm" type="number" step="0.1" placeholder="e.g. 172" min="100" max="250" required /></label><label>Preferred workout time <span>*</span><select name="preferred_workout_time" defaultValue="" required><option value="" disabled>Select a time</option><option>Early morning (5–8 AM)</option><option>Morning (8–12 PM)</option><option>Afternoon (12–4 PM)</option><option>Evening (4–8 PM)</option><option>Flexible</option></select></label><label className="full-field">Fitness goal <span>*</span><textarea name="transformation_reason" rows="3" placeholder="Share your goals, challenges, and what you hope to achieve." minLength="10" maxLength="2000" required /></label><label className="full-field">Additional message <small>(optional)</small><textarea name="additional_message" rows="3" placeholder="Anything else you would like your coach to know?" maxLength="2000" /></label><label className="full-field upload-label">Current body photo <small>(optional; attach it in WhatsApp after the message opens)</small><span className="upload-control"><input name="photo" type="file" accept="image/jpeg,image/png,image/webp" /><span className="upload-symbol">＋</span><span>Choose a JPG, PNG, or WebP image</span><small>Optional</small></span></label></div><label className="honeypot" aria-hidden="true">Website<input name="website" type="text" tabIndex="-1" autoComplete="off" /></label><label className="consent"><input type="checkbox" name="consent_given" required /><span>I agree to share my information with a KAVRO coach for fitness consultation and follow-up. <b>*</b></span></label><button type="submit" className="button button-dark submit-button">Send enquiry &amp; continue to WhatsApp <span>↗</span></button><p className="submit-note">WhatsApp opens with a prepared message; press Send there to contact the trainer.</p></form></>}</div></div>}
      </main>

      <footer className="site-footer"><a className="brand" href="#about"><span className="brand-mark">K</span><span className="brand-text"><span>KAVRO<span className="brand-period">.</span></span><small className="brand-sub">Muscle Monk</small></span></a><span>KNOWLEDGE · ACTION · VITALITY · RESULTS · OPTIMIZATION</span><a className="footer-contact" href="tel:+918892220980"><strong>Naveen</strong><span>+91 88922 20980</span></a><a href="#about">BACK TO TOP ↑</a></footer>
    </>
  );
}
