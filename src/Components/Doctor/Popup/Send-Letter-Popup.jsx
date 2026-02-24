// SendLetterModal.js
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Printer, Mail } from 'lucide-react';
const SendLetterModal = ({ isOpen, onClose }) => {
  const editorRef = useRef(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 p-2 bg-black/10 backdrop-blur-md">
  
      <div className="bg-white w-full max-w-2xl rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
    
        <div className="bg-[#008CBA] text-white px-4 py-2 flex justify-between items-center">
          <span className="font-semibold text-sm">Send Letter</span>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 px-2 py-0.5 border border-white/50 text-xs"
          >
            ✕
          </button>
        </div>

        <div className="p-4 bg-white">
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <div className="relative">
              <label className="block text-gray-500 text-[10px] mb-0.5">Name</label>
              <input type="text" placeholder="Doctor Name" className="w-full border-b border-gray-300 focus:border-[#008CBA] outline-none py-1 text-sm placeholder:text-gray-300" />
            </div>
            <div className="relative">
              <label className="block text-gray-500 text-[10px] mb-0.5">Address</label>
              <input type="text" placeholder="Address" className="w-full border-b border-gray-300 focus:border-[#008CBA] outline-none py-1 text-sm placeholder:text-gray-300" />
            </div>
            <div className="relative">
              <label className="block text-gray-500 text-[10px] mb-0.5">Mobile Number</label>
              <input type="number" placeholder="Mobile Number" className="w-full border-b border-gray-300 focus:border-[#008CBA] outline-none py-1 text-sm placeholder:text-gray-300" />
            </div>
            <div className="relative">
              <label className="block text-gray-500 text-[10px] mb-0.5">Email</label>
              <input type="text" placeholder="Email Address" className="w-full border-b border-gray-300 focus:border-[#008CBA] outline-none py-1 text-sm placeholder:text-gray-300" />
            </div>
          </div>

   
          <div className="border border-gray-200 rounded overflow-hidden">
            <Editor
              onInit={(evt, editor) => editorRef.current = editor}
              tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.2/tinymce.min.js"
              initialValue="<p>Write your letter here...</p>"
              init={{
                height: 250, 
                menubar: false, 
                plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'preview', 'searchreplace', 'visualblocks', 'code', 'wordcount'],
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist',
                branding: false,
                promotion: false,
                statusbar: false
              }}
            />
          </div>
        </div>

    <div className="p-3 flex  justify-start gap-2  bg-gray-50">

  <button 
    className="p-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
    aria-label="Print"
  >
    <Printer size={18} />
  </button>

  <button 
    className="p-2 text-white bg-[#008CBA] rounded hover:bg-[#007ba5] transition-colors"
    aria-label="Send Email"
  >
    <Mail size={18} />
  </button>
</div>
      </div>
    </div>
  );
};

export default SendLetterModal;