import Card from '../components/ui/Card'

const About = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6 w-full">
            <h1 
                className="font-display text-5xl md:text-6xl text-white uppercase tracking-tighter mb-12 leading-none" 
                style={{ textShadow: '4px 4px 0px #000' }}
            >
                About <span className="text-primary">CampusVault</span>
            </h1>
            <Card className="bg-white border-4 mb-12 p-8">
                <h2 className="font-display text-3xl uppercase mb-4 text-black tracking-tighter">
                    The Mission
                </h2>
                <p className="text-xl font-bold text-gray-700 leading-relaxed mb-6">
                    CampusVault was built to solve a simple problem: <span className="bg-secondary px-1 border-2 border-black text-black">Engineering gear is expensive.</span>
                </p>
                <p className="text-lg text-gray-700 font-bold leading-relaxed mb-6">
                    Why buy a Rs. 500 oscilloscope for one semester? Why let your DSLR gather dust?
                    We believe in a decentralized campus economy where resources circulate freely,
                    trust is currency, and brutal efficiency wins.
                </p>
                <p className="text-lg text-gray-700 font-bold leading-relaxed">
                    No middlemen. No hidden fees. Just peer-to-peer rental power.
                </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-secondary border-4 p-8">
                    <h3 className="font-display text-2xl uppercase mb-4 text-black font-black tracking-tighter">Open Source</h3>
                    <p className="font-bold text-black text-lg">Built by students, for students. The code is open, the design is raw.</p>
                </Card>
                <Card className="bg-primary text-white border-4 p-8">
                    <h3 className="font-display text-2xl uppercase mb-4 font-black tracking-tighter text-black mix-blend-multiply">Trust First</h3>
                    <p className="font-bold text-white text-lg">Our Trust Score algorithm ensures bad actors get banned and good stewards get rewarded.</p>
                </Card>
            </div>
        </div>
    )
}

export default About
