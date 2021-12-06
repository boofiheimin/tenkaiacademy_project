// import Image from 'next/image';

export default function Home() {
    return (
        <div className="h-full flex items-center justify-center overflow-auto" style={{ minHeight: 'inherit' }}>
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
