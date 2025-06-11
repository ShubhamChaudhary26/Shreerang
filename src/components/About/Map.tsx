'use client';

import ScrollFadeIn from '../../hooks/ScrollFadeIn'; // adjust path if needed

const Map = () => {
  return (
    <ScrollFadeIn delay={0.2}>
      <div className="w-full h-[500px] mt-20 mb-20">
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(100%)' }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.2688052685534!2d72.636126075194!3d23.088695179126038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b2abfbbf29b%3A0x3f7f9426b8e1709a!2sPramukh%20Paramount%2C%20Kudasan%2C%20Gandhinagar%2C%20Gujarat%20382421!5e0!3m2!1sen!2sin!4v1717930400000!5m2!1sen!2sin"
        ></iframe>
      </div>
    </ScrollFadeIn>
  );
};

export default Map;
