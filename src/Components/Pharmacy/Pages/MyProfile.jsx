import React, { useState } from "react";
import {
    CheckCircle2,
    Clock,
    Briefcase,
    ArrowRight,
    Code2,
    Palette,
    Terminal,
    Home
} from "lucide-react";




  // Helper for Initial
  const getInitial = (name) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };




const projects = [
    {
        id: 1,
        name: "Skote admin UI",
        startDate: "2 Sep, 2019",
        deadline: "20 Oct, 2019",
        budget: "$506",
    },
    {
        id: 2,
        name: "Skote admin Logo",
        startDate: "1 Sep, 2019",
        deadline: "2 Sep, 2019",
        budget: "$94",
    },
    {
        id: 3,
        name: "Redesign - Landing page",
        startDate: "21 Sep, 2019",
        deadline: "29 Sep, 2019",
        budget: "$156",
    },
    {
        id: 4,
        name: "App Landing UI",
        startDate: "29 Sep, 2019",
        deadline: "04 Oct, 2019",
        budget: "$122",
    },
    {
        id: 5,
        name: "Blog Template",
        startDate: "05 Oct, 2019",
        deadline: "16 Oct, 2019",
        budget: "$164",
    },
    {
        id: 6,
        name: "Redesign - Multipurpose Landing",
        startDate: "17 Oct, 2019",
        deadline: "05 Nov, 2019",
        budget: "$192",
    },
    {
        id: 7,
        name: "Logo Branding",
        startDate: "04 Nov, 2019",
        deadline: "05 Nov, 2019",
        budget: "$94",
    },
];

export default function MyProfile() {
    return (
        <div className="min-h-screen bg-[#f8f8fb] p-6 text-slate-700 font-sans">
            {/* Top Header / Breadcrumb */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-base font-semibold uppercase tracking-wider text-slate-800">
                    My Profile
                </h1>
                <div className="flex items-center gap-1.5 text-xs">
                    <Home className="w-3.5 h-3.5 text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors" />
                    <span className="text-slate-400">/</span>
                    <span className="text-slate-600 font-medium">My Profile</span>
                </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Column (User Card, Personal Info, Experience) */}
                <div className="lg:col-span-4 flex flex-col gap-6">

                    {/* User Welcome Card */}
                    <div className="bg-white rounded-md shadow-sm overflow-hidden border border-slate-100">
                        <div className="bg-indigo-100/60 p-5 flex justify-between items-start relative">
                            <div>
                                <h2 className="text-indigo-600 font-semibold text-base">Welcome Back !</h2>
                                <p className="text-indigo-400 text-xs mt-1">It will seem like simplified</p>
                            </div>
                            <div className="w-20 h-20 opacity-80">
                                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#818CF8" d="M40 160 L160 160 L140 80 L60 80 Z" />
                                    <circle cx="100" cy="60" r="20" fill="#6366F1" />
                                </svg>
                            </div>
                        </div>

                        <div className="p-5 pt-0 relative">
                            {/* Profile Avatar */}
                            <div className="-mt-10 mb-3 flex justify-between items-end">
                                <div className="w-20 h-20 rounded-full bg-slate-200 border-4 border-white overflow-hidden shadow-sm flex items-center justify-center text-slate-400">
                                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                                <div className="flex gap-8 text-center pr-4">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800">125</h4>
                                        <p className="text-[11px] text-slate-400 font-medium">Projects</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800">$1245</h4>
                                        <p className="text-[11px] text-slate-400 font-medium">Revenue</p>
                                    </div>
                                </div>
                            </div>

                            {/* User Identity */}
                            <div className="mt-2">
                                <h3 className="font-semibold text-slate-800 text-base">Surjit</h3>
                                <p className="text-xs text-slate-400">UI/UX Designer</p>
                            </div>

                            <button className="mt-4 inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3 py-1.5 rounded transition">
                                View Profile <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {/* Personal Information Card */}
                    <div className="bg-white rounded-md shadow-sm p-5 border border-slate-100">
                        <h3 className="font-semibold text-slate-800 text-sm mb-4">Personal Information</h3>
                        <p className="text-xs text-slate-400 leading-relaxed mb-5">
                            Hi I'm Cynthia Price, has been the industry's standard dummy text To an English person, it will seem like simplified English, as a skeptical Cambridge.
                        </p>

                        <div className="space-y-3 text-xs">
                            <div className="flex border-b border-slate-50 pb-2">
                                <span className="w-28 text-slate-500 font-medium">Full Name :</span>
                                <span className="text-slate-700">Cynthia Price</span>
                            </div>
                            <div className="flex border-b border-slate-50 pb-2">
                                <span className="w-28 text-slate-500 font-medium">Mobile :</span>
                                <span className="text-slate-700">(123) 123 1234</span>
                            </div>
                            <div className="flex border-b border-slate-50 pb-2">
                                <span className="w-28 text-slate-500 font-medium">E-mail :</span>
                                <span className="text-slate-700">cynthia@gmail.com</span>
                            </div>
                            <div className="flex pb-1">
                                <span className="w-28 text-slate-500 font-medium">Location :</span>
                                <span className="text-slate-700">California, United States</span>
                            </div>
                        </div>
                    </div>

                    {/* Experience Timeline Card */}
                    <div className="bg-white rounded-md shadow-sm p-5 border border-slate-100">
                        <h3 className="font-semibold text-slate-800 text-sm mb-6">Experience</h3>

                        <div className="relative border-l border-slate-200 ml-3 space-y-6">
                            <div className="relative pl-6">
                                <span className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-indigo-50 border border-indigo-500 flex items-center justify-center text-indigo-600">
                                    <Terminal className="w-2.5 h-2.5" />
                                </span>
                                <h4 className="text-xs font-semibold text-slate-800">Back end Developer</h4>
                                <p className="text-[11px] text-indigo-500 font-medium mt-0.5">2016 - 19</p>
                            </div>

                            <div className="relative pl-6">
                                <span className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-indigo-50 border border-indigo-500 flex items-center justify-center text-indigo-600">
                                    <Code2 className="w-2.5 h-2.5" />
                                </span>
                                <h4 className="text-xs font-semibold text-slate-800">Front end Developer</h4>
                                <p className="text-[11px] text-indigo-500 font-medium mt-0.5">2013 - 16</p>
                            </div>

                            <div className="relative pl-6">
                                <span className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-indigo-50 border border-indigo-500 flex items-center justify-center text-indigo-600">
                                    <Palette className="w-2.5 h-2.5" />
                                </span>
                                <h4 className="text-xs font-semibold text-slate-800">UI / UX Designer</h4>
                                <p className="text-[11px] text-indigo-500 font-medium mt-0.5">2011 - 13</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column (Stats Cards, Chart Placeholder, Projects Table) */}
                <div className="lg:col-span-8 flex flex-col gap-6">

                    {/* Top Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div className="bg-white p-4 rounded-md shadow-sm border border-slate-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-400 font-medium">Completed Projects</p>
                                <h3 className="text-xl font-bold text-slate-800 mt-2">125</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-sm border border-slate-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-400 font-medium">Pending Projects</p>
                                <h3 className="text-xl font-bold text-slate-800 mt-2">12</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                <Clock className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-sm border border-slate-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-400 font-medium">Total Revenue</p>
                                <h3 className="text-xl font-bold text-slate-800 mt-2">$36,524</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                <Briefcase className="w-5 h-5" />
                            </div>
                        </div>

                    </div>

                    {/* Revenue Chart Box */}
                    <div className="bg-white p-5 rounded-md shadow-sm border border-slate-100 min-h-[120px]">
                        <h3 className="font-semibold text-slate-800 text-sm mb-4">Revenue</h3>
                        {/* Chart Area Placeholder */}
                        <div className="h-20 w-full flex items-center justify-center text-slate-300 text-xs border border-dashed border-slate-100 rounded">
                            Revenue chart area
                        </div>
                    </div>

                    {/* My Projects Table */}
                    <div className="bg-white rounded-md shadow-sm border border-slate-100 p-5 overflow-x-auto">
                        <h3 className="font-semibold text-slate-800 text-sm mb-4">My Projects</h3>

                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 text-[12px] text-slate-500">
                                    <th className="pb-3 font-semibold w-12">#</th>
                                    <th className="pb-3 font-semibold">Projects</th>
                                    <th className="pb-3 font-semibold">Start Date</th>
                                    <th className="pb-3 font-semibold">Deadline</th>
                                    <th className="pb-3 font-semibold">Budget</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-xs text-slate-600">
                                {projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-slate-50/60 transition">
                                        <td className="py-3.5 font-medium text-slate-800">{project.id}</td>
                                        <td className="py-3.5 font-medium text-slate-800">{project.name}</td>
                                        <td className="py-3.5 text-slate-500">{project.startDate}</td>
                                        <td className="py-3.5 text-slate-500">{project.deadline}</td>
                                        <td className="py-3.5 font-medium text-slate-700">{project.budget}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-400 gap-2">
                <div>Copyright 2026 PRIC. All rights reserved.</div>
                <div>Design & Develop by Sedulous Softtech</div>
            </div>
        </div>
    );
}