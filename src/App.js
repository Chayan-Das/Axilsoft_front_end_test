import React, { useState, useEffect } from 'react';
import './App.css';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

const App = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    age: '',
    password: '',
    email: '',
    applyingPosition: '',
    skills: [],
    skillInput: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Load form data from localStorage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Failed to parse formData from localStorage", error);
      }
    }
  }, []);

  // Update localStorage 
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  // Validate all fields
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.age || isNaN(formData.age)) newErrors.age = 'Valid age is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    return newErrors;
  };

  // Handle changes for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };

  // Handle changes for skill
  const handleSkillChange = (e) => {
    setFormData({ ...formData, skillInput: e.target.value });
  };

  // Add skills chip
  const addSkill = () => {
    if (formData.skillInput) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.skillInput],
        skillInput: ''
      });
    }
  };

  // Remove skill chip
  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
  };

  // Reset skills
  const resetSkills = () => {
    setFormData({ ...formData, skills: [] });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      address: '',
      age: '',
      password: '',
      email: '',
      applyingPosition: '',
      skills: [],
      skillInput: ''
    });
    setErrors({});
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log(formData);
      resetForm();
    }
  };

  // Password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit} style={{ margin: '20px' }}>
        <h2 className="text-2xl mb-6">UNKNOWN FORM</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.age && <p className="text-red-500 text-xs">{errors.age}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <div className="flex mb-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <button type="button" onClick={togglePasswordVisibility} className="ml-2 p-2 bg-blue-500 text-white rounded">
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Applying Position</label>
          <select
            name="applyingPosition"
            value={formData.applyingPosition}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Position</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="full-stack">Full-Stack</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Skills</label>
          <div className="flex mb-2">
            <input
              type="text"
              value={formData.skillInput}
              onChange={handleSkillChange}
              className="w-full p-2 border rounded"
            />
            <button type="button" onClick={addSkill} className="ml-2 p-2 bg-blue-500 text-white rounded">
              Add
            </button>
          </div>
          <div>
            {formData.skills.map((skill, index) => (
              <div key={index} className='flex flex-row'>
                <div className='flex flex-row' style={{ margin: '8px', backgroundColor: '#F2F2F2', padding: '6px', marginLeft: '0px', borderRadius: '5px' }}>
                  {skill}
                  <span><MdOutlineCancel size={21} onClick={() => removeSkill(index)} style={{ marginLeft: '10px', cursor: 'pointer' }} /></span>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={resetSkills} className="mt-2 p-2 bg-red-500 text-white rounded">
            Reset Skills
          </button>
        </div>

        <hr style={{ marginTop: '20px', marginBottom: '20px' }}></hr>

        <div className="flex justify-between">
          <button type="button" onClick={resetForm} className="p-2 bg-red-500 text-white rounded">
            Reset Form
          </button>
          <button type="submit" className="p-2 bg-green-500 text-white rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
