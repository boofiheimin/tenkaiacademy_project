// import Image from 'next/image';

export default function Home() {
    return (
        <div className="h-full flex items-center justify-center">
            {/* <div className="flex flex-col items-center justify-center">
                <div className="relative h-40 w-40">
                    <Image
                        src="https://c.tenor.com/SvTdwYxZvdUAAAAd/hololive-amane-kanata.gif"
                        layout="fill"
                        objectFit="contain"
                        alt=""
                    />
                </div>
                <span className="text-center w-full font-bold text-xl">Coming Soon™</span>
            </div> */}
            <div>
                <span>Kanata Light</span>
                <div className="h-8 w-80" style={{ background: '#8CD5DF' }} />
                <div className="h-8 w-80" style={{ background: '#2263E8' }} />
                <div className="h-8 w-80" style={{ background: '#D5C37E' }} />
                <div className="h-8 w-80" style={{ background: '#F2FBFC' }} />
                <div className="h-8 w-80" style={{ background: '#32282B' }} />
            </div>
            <div className="ml-8">
                <span>Kanata Dark</span>
                <div className="h-8 w-80" style={{ background: '#2263E8' }} />
                <div className="h-8 w-80" style={{ background: '#2E395D' }} />
                <div className="h-8 w-80" style={{ background: '#D5C37E' }} />
                <div className="h-8 w-80" style={{ background: '#32282B' }} />
                <div className="h-8 w-80" style={{ background: '#E5E1DD' }} />
            </div>
        </div>
    );
}
