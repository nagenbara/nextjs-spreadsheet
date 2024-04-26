"use client";
import { useState } from 'react';
import { sendData } from '../server/send-data';
import sendMessageToTelegramBot from '../server/send-message-bot';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      await sendData(formData);
      setSubmitSuccess(true);
      sendMessageToTelegramBot(`Ada pesan baru masuk dari ${formData.name} \n\nMessage : ${formData.message}`)
    } catch (error) {
      console.log('Error sending data:', error);
      setSubmitError('Failed to send message. Please try again later.');
      sendMessageToTelegramBot(`Ada pesan baru masuk dari ${formData.name}, namun website gagal mengirim data ke spdreasheet. \n\nEmail : ${formData.email}\n\nMessage : ${formData.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-[#438e96] to-[#3b757f] flex flex-col items-center justify-center px-5">
        {submitSuccess && <div className="bg-[#1a2c32] border rounded-md border-[#2d464c] text-green-500 mb-4 w-full px-5 py-2 max-w-3xl">Message sent successfully!</div>}
        {submitError && <div className="bg-[#1a2c32] border rounded-md border-[#2d464c] text-red-500 mb-4 w-full px-5 py-2 max-w-3xl">{submitError}</div>}
        <div className="bg-[#1a2c32] shadow-[10px_10px_10px_-8px] shadow-[#92cace] p-5 max-w-3xl grid grid-cols-1 md:grid-cols-2 py-10 px-10 gap-10 lg:gap-0">
          <div className="bg-[#356169] w-full shadow-[0_0_10px_-1px] shadow-[#92cace] lg:-ml-20 text-[#edfaff] p-10 flex flex-col justify-between">
            <h1 className="text-left text-[30px]">Contact Us</h1>
            <div className="text-[#d6f2ff] space-y-5 text-base">
              <div className="flex gap-5 items-center">
                <div className="self-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={15}
                    height={15}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="feather feather-map-pin"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx={12} cy={10} r={3} />
                  </svg>
                </div>
                <span>Maple Avenue, United States</span>
              </div>
              <div className="flex gap-5 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="feather feather-mail"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-.9 0-2-.9-2-2V6c0-1.1 1.1-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
                <span>company@email.com</span>
              </div>
              <div className="flex gap-5 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="feather feather-phone"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 16.92V21a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012 4.18 2 2 0 014 2h4.09a2 2 0 011.82 1.09l1.71 3.44a2 2 0 01-.45 2.35L9.09 9.91a16.28 16.28 0 006.91 6.91l1.09-1.09a2 2 0 012.35-.45l3.44 1.71A2 2 0 0122 16.91z" />
                </svg>
                <span>022-0129392</span>
              </div>
            </div>
            <div className="text-left text-[30px] flex gap-5">
              <a href="#">
                <div className="h-10 w-10 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 256 256"
                  >
                    <g fill="none">
                      <rect
                        width={256}
                        height={256}
                        fill="url(#skillIconsInstagram0)"
                        rx={60}
                      />
                      <rect
                        width={256}
                        height={256}
                        fill="url(#skillIconsInstagram1)"
                        rx={60}
                      />
                      <path
                        fill="#fff"
                        d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396c0 26.688-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413c0-26.704.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5c3.5-3.5 6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355c0 28.361 22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334c-18.41 0-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334"
                      />
                      <defs>
                        <radialGradient
                          id="skillIconsInstagram0"
                          cx={0}
                          cy={0}
                          r={1}
                          gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#fd5" />
                          <stop offset=".1" stopColor="#fd5" />
                          <stop offset=".5" stopColor="#ff543e" />
                          <stop offset={1} stopColor="#c837ab" />
                        </radialGradient>
                        <radialGradient
                          id="skillIconsInstagram1"
                          cx={0}
                          cy={0}
                          r={1}
                          gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#3771c8" />
                          <stop offset=".128" stopColor="#3771c8" />
                          <stop offset={1} stopColor="#60f" stopOpacity={0} />
                        </radialGradient>
                      </defs>
                    </g>
                  </svg>
                </div>
              </a>
              <a href="#">
                <div className="h-10 w-10 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 128 128"
                  >
                    <path
                      fill="#0076b2"
                      d="M116 3H12a8.91 8.91 0 0 0-9 8.8v104.42a8.91 8.91 0 0 0 9 8.78h104a8.93 8.93 0 0 0 9-8.81V11.77A8.93 8.93 0 0 0 116 3"
                    />
                    <path
                      fill="#fff"
                      d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 1 1-10.5 10.49a10.5 10.5 0 0 1 10.5-10.49m20.41 29h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"
                    />
                  </svg>
                </div>
              </a>
              <a href="#">
                <div className="h-10 w-10 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"
                    />
                  </svg>
                </div>
              </a>
              <a href="#">
                <div className="h-10 w-10 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 128 128"
                  >
                    <rect
                      width="118.35"
                      height="118.35"
                      x="4.83"
                      y="4.83"
                      fill="#3d5a98"
                      rx="6.53"
                      ry="6.53"
                    />
                    <path
                      fill="#fff"
                      d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A127 127 0 0 0 91 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
          <form className="text-white w-full space-y-8 lg:-ml-5"  onSubmit={handleSubmit}>
            <div className="space-y-2">
              <h1 className="uppercase text-left text-lg font-medium">
                Get in Touch
              </h1>
              <p className="text-sm">
                Please send us your questions, comments, or feedback using the form
                below. We&apos;re here to help!
              </p>
            </div>
            <div className="space-y-5 *:rounded-sm">
              <input
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="name"
                className="bg-[#edfaff] w-full outline-none p-2 text-black"
              />
              <input
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                required 
                placeholder="email"
                className="bg-[#edfaff] w-full outline-none p-2 text-black"
              />
              <textarea
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                placeholder="message"
                className="bg-[#edfaff] w-full outline-none p-2 text-black min-h-[100px]"
                defaultValue={""}
              />
            </div>
            <div className="text-left">
              <button
                className="bg-gradient-to-b from-[#438e96] to-[#3b757f] rounded-full py-2 px-5 text-[#edfaff]"
                type="submit" 
                disabled={isSubmitting} 
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
