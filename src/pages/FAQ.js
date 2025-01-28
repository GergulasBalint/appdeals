import React, { useState } from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "What is App Deals?",
      answer: "App Deals is a platform that offers exclusive lifetime deals and discounts on premium software tools and digital products. We partner with software companies to bring you the best possible prices on tools that can help grow your business."
    },
    {
      question: "How do lifetime deals work?",
      answer: "Lifetime deals give you permanent access to a software product with a one-time payment, instead of paying recurring monthly or annual fees. Once purchased, you'll have access to the specified features forever."
    },
    {
      question: "Are these deals legitimate?",
      answer: "Yes! All deals on our platform are legitimate and come directly from our partnerships with software companies. We carefully vet each deal to ensure you're getting genuine value."
    },
    {
      question: "What happens after I purchase a deal?",
      answer: "After purchase, you'll receive an email with instructions on how to access your software. This usually includes activation codes or direct access to set up your account."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee on most deals. If you're not satisfied with your purchase, contact our support team within 30 days for a full refund."
    },
    {
      question: "How long do deals last?",
      answer: "Deal durations vary. Some are available for a limited time, while others run until they reach a maximum number of sales. We recommend acting quickly if you see a deal you like!"
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left font-medium flex justify-between items-center hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <span className="text-xl">{openIndex === index ? '−' : '+'}</span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 text-gray-600 border-t">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ; 