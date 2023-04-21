import NameSection from './sections/NameSection';
import RankingSection from './sections/RankingSection';
import HeaderSection from './sections/HeaderSection';
import FooterSection from './sections/FooterSection';

function HomePage() {
    
    return (
        <>
            <HeaderSection />

            <RankingSection />

            <NameSection />

            <FooterSection />
        </>
    );
}

export default HomePage;