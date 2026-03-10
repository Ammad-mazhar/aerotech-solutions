import React from 'react';
import { ClipboardCheck, Users, Timer, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const StatItem = ({ icon: Icon, value, label, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.21, 0.45, 0.32, 0.9] }}
        className="group relative flex flex-col items-center p-8 rounded-3xl transition-all duration-500 hover:bg-white/5"
    >
        {/* Decorative Background Glow */}
        <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 rounded-3xl blur-2xl transition-all duration-500 -z-10" />

        <div className="relative mb-6">
            {/* Icon Glow */}
            <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative w-16 h-16 flex items-center justify-center">
                <Icon size={36} className="text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
            </div>
        </div>

        <div className="text-center">
            <h3 className="text-5xl font-black text-white mb-2 tracking-tighter tabular-nums bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                {value}
            </h3>
            <div className="h-1 w-8 bg-orange-500 mx-auto rounded-full mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <p className="text-orange-100/50 font-bold uppercase tracking-[0.2em] text-[10px]">
                {label}
            </p>
        </div>
    </motion.div>
);

const Stats = () => {
    const stats = [
        {
            icon: ClipboardCheck,
            value: "10,000+",
            label: "Deliveries",
            delay: 0.1
        },
        {
            icon: Timer,
            value: "5+ Yrs",
            label: "Experience",
            delay: 0.2
        },
        {
            icon: Users,
            value: "8,500+",
            label: "Clients",
            delay: 0.3
        },
        {
            icon: Star,
            value: "4.9/5",
            label: "Rating",
            delay: 0.4
        }
    ];

    return (
        <section className="relative bg-[#7f1d1d] py-24 overflow-hidden">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/30 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/40 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {stats.map((stat, index) => (
                        <StatItem key={index} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
