import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Star, Check, ArrowRight, FileText, Heart, Pen } from 'lucide-react';

export default function JoinHLA() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    regNumber: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    interests: [],
    experience: '',
    motivation: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const departments = [
    'Computer Science Engineering',
    'Electronics and Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Information Technology'
  ];

  const years = ['First', 'Second', 'Third', 'Fourth'];
  
  const interests = [
    'Poetry Writing',
    'Story Writing',
    'Drama/Theatre',
    'Literary Criticism',
    'Blog Writing',
    'Event Organization',
    'Cultural Activities'
  ];

  const validateStep = () => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.regNumber.trim()) newErrors.regNumber = 'Registration number is required';
        break;
      case 2:
        if (!formData.email.trim() || !/\S+@vitstudent\.ac\.in$/.test(formData.email)) 
          newErrors.email = 'Valid VIT email is required';
        if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) 
          newErrors.phone = 'Valid 10-digit phone number is required';
        break;
      case 3:
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.year) newErrors.year = 'Year of study is required';
        break;
      case 4:
        if (formData.interests.length === 0) 
          newErrors.interests = 'Select at least one area of interest';
        break;
      case 5:
        if (!formData.motivation.trim()) 
          newErrors.motivation = 'Please share your motivation for joining';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      // Here you would typically send the form data to a backend service
      console.log('Form submitted:', formData);
      setSubmitted(true);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
              <input
                name="regNumber"
                type="text"
                value={formData.regNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.regNumber ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                placeholder="Enter your VIT registration number"
              />
              {errors.regNumber && <p className="text-red-500 text-sm mt-1">{errors.regNumber}</p>}
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                placeholder="Enter your VIT email (must end with @vitstudent.ac.in)"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                placeholder="Enter your 10-digit phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.department ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              >
                <option value="">Select your department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.year ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              >
                <option value="">Select your year</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year} Year</option>
                ))}
              </select>
              {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
            </div>
          </motion.div>
        );
      
      case 4:
        return (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Interest</label>
              <div className="grid md:grid-cols-3 gap-3">
                {interests.map((interest) => (
                  <motion.label 
                    key={interest} 
                    className="flex items-center space-x-2 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <input 
                      type="checkbox" 
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestToggle(interest)}
                      className="rounded text-orange-600 focus:ring-orange-500" 
                    />
                    <span className="text-sm">{interest}</span>
                  </motion.label>
                ))}
              </div>
              {errors.interests && <p className="text-red-500 text-sm mt-1">{errors.interests}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Previous Experience</label>
              <textarea
                name="experience"
                rows={4}
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Tell us about your previous experience in literary activities (if any)"
              ></textarea>
            </div>
          </motion.div>
        );
      
      case 5:
        return (
          <motion.div 
            key="step5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Why do you want to join HLA?</label>
              <textarea
                name="motivation"
                rows={4}
                value={formData.motivation}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.motivation ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                placeholder="Share your motivation for joining HLA"
              ></textarea>
              {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>}
            </div>
          </motion.div>
        );
      
      case 6:
        return (
          <motion.div 
            key="step6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="bg-green-100 p-4 rounded-full"
              >
                <Check className="h-12 w-12 text-green-600" />
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Application Submitted!</h2>
            <p className="text-gray-600">Thank you for applying to HLA. We'll review your application soon.</p>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 pt-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <div className="bg-white/30 backdrop-blur-md rounded-xl p-8 mb-8 text-center">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FileText className="mr-3 text-orange-600" />
            Join HLA @ VIT Chennai
          </motion.h1>
          <p className="text-gray-600 flex items-center justify-center">
            <Heart className="mr-2 text-red-500" />
            Become a part of VIT Chennai's premier Hindi literary community
          </p>
        </div>

        <motion.div
          className="bg-white/40 backdrop-blur-md rounded-xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6 flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <motion.div
                key={num}
                className={`w-10 h-2 rounded-full ${
                  step > num ? 'bg-orange-600' : 
                  step === num ? 'bg-orange-400' : 'bg-gray-300'
                }`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
              />
            ))}
            </div>

<AnimatePresence mode="wait">
  {renderStep()}
</AnimatePresence>

{!submitted && step < 6 && (
  <div className="mt-6 flex justify-between">
    {step > 1 && (
      <motion.button
        type="button"
        onClick={prevStep}
        className="flex items-center px-6 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowRight className="mr-2 rotate-180 h-5 w-5" />
        Previous
      </motion.button>
    )}

    {step < 5 ? (
      <motion.button
        type="button"
        onClick={nextStep}
        className="ml-auto flex items-center px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Next Step
        <ArrowRight className="ml-2 h-5 w-5" />
      </motion.button>
    ) : (
      <motion.button
        type="submit"
        onClick={handleSubmit}
        className="ml-auto flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Send className="mr-2 h-5 w-5" />
        Submit Application
      </motion.button>
    )}
  </div>
)}

{submitted && (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="mt-6 text-center"
  >
    <motion.button
      onClick={() => {
        setSubmitted(false);
        setStep(1);
        setFormData({
          fullName: '',
          regNumber: '',
          email: '',
          phone: '',
          department: '',
          year: '',
          interests: [],
          experience: '',
          motivation: ''
        });
      }}
      className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center mx-auto"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Pen className="mr-2 h-5 w-5" />
      Submit Another Application
    </motion.button>
  </motion.div>
)}
</motion.div>
</motion.div>
</div>
);
}