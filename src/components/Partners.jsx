import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

const Partners = () => {
    const partners = [
        "Home Warranty of America",
        "Choice Home Warranty"
    ];

    return (
        <section className="bg-white py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                            <ShieldCheck size={12} className="text-orange-400" />
                            Trusted Ecosystem
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                            Powering Operations for <br className="hidden md:block" /> Industry Leaders.
                        </h2>
                        <p className="mt-6 text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                            We serve as the primary specialized technical force for top-tier home warranty
                            and property asset management groups.
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        {partners.map((partner, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                whileHover={{ y: -5, borderColor: '#f97316' }}
                                className="group relative flex items-center gap-3 px-8 py-5 bg-white border border-slate-200 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] transition-all duration-300 cursor-default"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-orange-500 transition-colors duration-300" />
                                <span className="text-sm md:text-base font-black text-slate-700 group-hover:text-slate-900 transition-colors duration-300">
                                    {partner}
                                </span>
                                <ArrowUpRight size={14} className="text-slate-300 group-hover:text-orange-500 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 pt-8 border-t border-slate-100 w-full flex justify-center"
                    >
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                            Authorized Service Network • 2024-2025 Partner Program
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Partners;
