import Image from 'next/image';

export default function Home() {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <div className="relative h-40 w-40">
                    <Image
                        src="https://c.tenor.com/SvTdwYxZvdUAAAAd/hololive-amane-kanata.gif"
                        layout="fill"
                        objectFit="contain"
                        alt=""
                    />
                </div>
                <span className="text-center w-full font-bold text-xl">Coming Soon™</span>
            </div>
        </div>
    );
}
