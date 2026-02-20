export default function Hero() {
    return (
        <section className="flex flex-col justify-center min-h-[60vh] px-4 md:px-0 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold font-sans text-white leading-tight mb-6 tracking-tight">
                Your Idea, My Curiosity.<br className="hidden md:block" />
                <span className="md:hidden"> </span>Let’s do it.
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 font-light max-w-2xl mx-auto md:mx-0">
                Tell me your vision, your idea, or just say hi.
            </p>
        </section>
    );
}
