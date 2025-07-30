import { Footer } from '@/components/footer';
import { Marquee } from '@/components/marquee';
import { Navbar } from '@/components/navbar';
import { ReactChildren } from '@/types/react';

export const Layout = ({ children }: ReactChildren) => {
    return (
        <div className="flex flex-col">
            <Navbar />
            {children}
            <Marquee />
            <Footer />
        </div>
    );
};
