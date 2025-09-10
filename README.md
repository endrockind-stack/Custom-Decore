import { useState } from "react"; import { motion } from "framer-motion"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button";

export default function LandingPage() { const [email, setEmail] = useState("endrockind@gmail.com"); const [submitted, setSubmitted] = useState(false);

const handleSubmit = (e) => { e.preventDefault(); if (email) { setSubmitted(true); setEmail(""); } };

return ( <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6"> {/* Hero Section */} <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl" > <h1 className="text-4xl font-bold mb-4">Custom Decore</h1> <p className="text-lg text-gray-600 mb-6"> Your Space. Your Style. Our AI. </p> <p className="text-base text-gray-500 mb-8"> Upload your room. Get personalized, AI-powered decor suggestions. 3D printed and delivered to your door. </p> </motion.div>

{/* Business Model Section */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.6 }}
    className="max-w-3xl bg-white shadow-md rounded-2xl p-6 mb-12"
  >
    <h2 className="text-2xl font-semibold mb-4 text-center">
      Our Business Model
    </h2>
    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
      Custom Decore operates on a direct-to-consumer model through our website
      and future mobile app. We generate revenue in multiple ways:
    </p>
    <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
      <li>
        <strong>Product Sales:</strong> Personalized, 3D printed decor items
        ordered directly through the platform.
      </li>
      <li>
        <strong>Premium AI Suggestions:</strong> Paid access to more advanced,
        hyper-customized design recommendations tailored to individual rooms.
      </li>
      <li>
        <strong>Custom Projects:</strong> Partnerships with interior designers
        or offices for bespoke design and decor solutions.
      </li>
      <li>
        <strong>Subscription Model (Future):</strong> Monthly themed decor kits
        delivered to customers who want continuous refreshes of their spaces.
      </li>
    </ul>
    <p className="text-gray-600 mt-4 text-sm leading-relaxed">
      This multi-stream approach allows us to validate demand, collect user
      data for AI improvement, and scale sustainably while offering affordable,
      unique, and personalized products to our users.
    </p>
  </motion.div>

  {/* Signup Card */}
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3, duration: 0.5 }}
  >
    <Card className="w-full max-w-md shadow-lg rounded-2xl">
      <CardContent className="p-6">
        {submitted ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">
              🎉 You’re on the list!
            </h2>
            <p className="text-gray-600 text-sm">
              Thanks for signing up. We’ll notify you at <strong>endrockind@gmail.com</strong> when we launch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-sm font-medium text-gray-700 text-left">
              Join our waitlist:
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <Button type="submit" className="rounded-xl py-3 font-medium">
              Join Now
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  </motion.div>

  {/* Footer */}
  <motion.footer
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6 }}
    className="mt-12 text-sm text-gray-500"
  >
    © {new Date().getFullYear()} Custom Decore. All rights reserved. Contact: endrockind@gmail.com
  </motion.footer>
</div>

); }
