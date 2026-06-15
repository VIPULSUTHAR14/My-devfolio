'use client'
import { Briefcase, Mail, UserRound } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
    name: string;
    email: string;
    message: string;
}

export default function Message() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim().toLowerCase(),
                    message: formData.message.trim(),
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to send message");
            }

            setSuccess(true);
            setFormData({
                name: "",
                email: "",
                message: "",
            });
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="contact" className="w-[80vw] p-10" >
            <div className="bg-slate-200/10 rounded-2xl flex justify-center items-center align-middle px-10 py-20" >
                <div className=" flex flex-col items-start align-middle justify-center space-y-9 w-[50vw]" >
                    <div className="flex justify-center align-middle items-center font-mono text-4xl " >Get In Touch</div>
                    <div className="flex justify-center align-middle items-center  font-mono w-[30vw] " >Currently open for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!</div>
                    <div className="flex justify-center align-middle items-center space-x-6 pt-10" >
                        <button className="font-mono text-sm bg-slate-800 border-2 rounded-full text-md   size-14 flex justify-center align-middle items-center cursor-pointer" >{`< >`}</button>
                        <button className="font-mono text-sm bg-slate-800 border-2 rounded-full text-md   size-14 flex justify-center align-middle items-center cursor-pointer" ><Briefcase /></button>
                        <button className="font-mono text-sm bg-slate-800 border-2 rounded-full text-md   size-14 flex justify-center align-middle items-center cursor-pointer" ><Mail /></button>
                    </div>
                </div>
                <div className="w-[50vw]" >
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-md mx-auto flex flex-col gap-4 p-6 rounded-xl"
                    >
                        <h2 className="text-xl font-mono flex align-middle items-center ">Name <UserRound className="ml-2" /> </h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="border rounded-lg p-3 outline-none bg-white place-content-center text-slate-900 disabled:opacity-60"
                        />
                        <h2 className="text-xl font-mono flex align-middle items-center gap-2" >Email <Mail /></h2>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="border rounded-lg p-3 outline-none bg-white text-slate-900 disabled:opacity-60"
                        />

                        <h2 className="text-xl font-mono flex align-middle items-center gap-2" >Message</h2>
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            rows={5}
                            className="border rounded-lg p-3 outline-none resize-none font-mono bg-white text-slate-900 disabled:opacity-60"
                        />

                        {/* Status Feedback */}
                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                                ✓ Message sent successfully! I will get back to you soon.
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-slate-900 font-mono text-xl  text-white py-3 rounded-lg hover:opacity-90 transition border-b-8 border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}