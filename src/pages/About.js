import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About App Deals</h1>
        
        <div className="space-y-8 bg-white rounded-xl shadow-lg p-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              At App Deals, we're passionate about making premium software accessible to everyone. 
              We partner with top software companies to bring you exclusive deals on tools that can 
              transform your work and boost your productivity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
            <p className="text-gray-600">
              We curate the best software deals, focusing on lifetime deals and significant discounts 
              that provide exceptional value. Our platform features carefully selected tools for 
              entrepreneurs, developers, designers, and digital professionals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Quality: We only feature tools we believe in</li>
              <li>Value: Significant savings on essential software</li>
              <li>Trust: Building long-term relationships with our customers</li>
              <li>Support: Dedicated customer service for all purchases</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About; 